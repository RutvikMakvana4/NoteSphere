import express from "express";
const routes = express.Router();

routes.use("/auth", require("../../src/apis/auth/authRouter"));
routes.use("/note", require("../../src/apis/notes/noteRouter"));

module.exports = routes;
