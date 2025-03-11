import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { app } from "./Server.js";

import { authenticated } from "./middleware/auth.js";

import Controller from "./controllers/Controller.js";
import LoggerController from "./controllers/LoggerController.js";

if (process.env.APP_ENV === "dev") {
  app.use(cors());
}

app.use(bodyParser.json());

const portal = express.Router();

/**
 * Portal routes
 */
app.use("/portal", portal);
portal.use(authenticated);
portal.get("/logs", LoggerController.list);
portal.post("/logs", LoggerController.create);

/**
 * Base routes
 */
app.get("/", Controller.base);
