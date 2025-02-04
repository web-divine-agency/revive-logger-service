import Logger from "../util/logger.js";
import Validator from "../util/validator.js";

import MysqlService from "../services/MysqlService.js";

export default {
  /**
   * List logs
   * @param {*} req
   * @param {*} res
   * @returns
   */
  list: (req, res) => {
    let validation = Validator.check([
      Validator.required(req.query, "show"),
      Validator.required(req.query, "page"),
    ]);

    if (!validation.pass) {
      let message = Logger.message(req, res, 422, "error", validation.result);
      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }

    const { show, page } = req.query;
    let find = req.query.find || "";
    let sort_by = req.query.sort_by || "activity_logs.created_at_order";

    let query = `
      SELECT
        activity_logs.id AS logs_id,
        users.id AS user_id,
        activity_logs.module,
        activity_logs.note,
        users.first_name,
        users.last_name,
        users.gender,
        users.username,
        users.email,
        users.mobile,
        users.deleted_at,
        users.deleted_at_order,
        activity_logs.created_at,
        activity_logs.created_at_order,
        activity_logs.updated_at,
        activity_logs.updated_at_order
      FROM activity_logs
      INNER JOIN users ON activity_logs.user_id = users.id
      WHERE 
        (
          users.first_name LIKE "%${find}%" OR
          users.last_name LIKE "%${find}%" OR
          activity_logs.module LIKE "%${find}%" OR
          activity_logs.note LIKE "%${find}%" OR
          users.email LIKE "%${find}%"
        )
      ORDER BY ${sort_by} DESC
    `;

    MysqlService.paginate(query, "activity_logs.id", show, page)
      .then((response) => {
        let message = Logger.message(req, res, 200, "activity_logs", response);
        Logger.out([JSON.stringify(message)]);
        return res.json(message);
      })
      .catch((error) => {
        let message = Logger.message(req, res, 200, "error", error);
        Logger.error([JSON.stringify(message)]);
        return res.json(message);
      });
  },

  /**
   * Create logs
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: async (req, res) => {
    let validation = Validator.check([
      Validator.required(req.body, "user_id"),
      Validator.required(req.body, "module"),
      Validator.required(req.body, "note"),
    ]);

    if (!validation.pass) {
      let message = Logger.message(req, res, 422, "error", validation.result);
      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }

    const { user_id, module, note } = req.body;

    MysqlService.create("activity_logs", { user_id: user_id, module: module, note: note })
      .then((response) => {
        let message = Logger.message(req, res, 200, "activity_log", response.insertId);
        Logger.out([JSON.stringify(message)]);
        return res.json(message);
      })
      .catch((error) => {
        let message = Logger.message(req, res, 500, "error", error);
        Logger.error([JSON.stringify(message)]);
        return res.json(message);
      });
  },
};
