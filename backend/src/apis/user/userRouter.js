import express from "express";
import asyncWrap from "express-async-wrapper";
import userController from "./userController";

const routes = express.Router();
import authentication from "../../common/middleware/authentication";

routes.get("/profile", authentication, asyncWrap(userController.userProfile));

module.exports = routes;
