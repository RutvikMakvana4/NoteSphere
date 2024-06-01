import express from "express";

const routes = express.Router();

routes.use("/api/v1", require("./apis/index"));

module.exports = routes;
