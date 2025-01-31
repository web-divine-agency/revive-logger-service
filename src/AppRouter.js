import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { app } from "./Server.js";

import { authAdmin, authenticated } from "./middleware/auth.js";

import Controller from "./controllers/Controller.js";
import LoggerController from "./controllers/LoggerController.js";

if (process.env.APP_ENV === "dev") {
  app.use(cors());
}

app.use(bodyParser.json());

const portal = express.Router();
const admin = express.Router();

/**
 * Portal routes
 */
app.use("/portal", portal);
portal.use(authenticated);
portal.get("/res/logs", LoggerController.list);
portal.post("/res/logs", LoggerController.create);

/**
 * Admin routes
 */
app.use("/admin", admin);
admin.use(authAdmin);

/**
 * Base routes
 */
app.get("/", Controller.base);
