import express from "express";
import asyncWrap from "express-async-wrapper";
import authController from "./authController";

const routes = express.Router();
import authentication from "../../common/middleware/authentication";

routes.post(
  "/register",

  asyncWrap(authController.register)
);
routes.post("/login", asyncWrap(authController.login));
routes.post("/logout", authentication, asyncWrap(authController.logout));

module.exports = routes;
