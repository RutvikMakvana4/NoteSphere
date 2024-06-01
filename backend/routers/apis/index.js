import express from "express";
const routes = express.Router();

routes.use("/auth", require("../../src/apis/auth/authRouter"));

module.exports = routes;
