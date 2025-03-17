import jwt from "jsonwebtoken";

import Logger from "../util/logger.js";

export function authenticated(req, res, next) {
  let message,
    token = req.header("Authorization");

  if (!token) {
    message = Logger.message(req, res, 404, "error", "Token not found");
    Logger.error([JSON.stringify(message)]);
    return res.json(message);
  }

  // Authorized using app password
  if (token.length === 24) {
    if (token === process.env.APP_PASSWORD || verified) {
      next();
    } else {
      message = Logger.message(req, res, 401, "error", "Not authorized");
      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }
    // Authorized using jwt
  } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      message = Logger.message(req, res, 401, "error", "Not authorized");
      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }
  }
}
