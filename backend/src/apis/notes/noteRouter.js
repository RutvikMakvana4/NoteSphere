import express from "express";
import asyncWrap from "express-async-wrapper";
import noteController from "./noteController";

const routes = express.Router();
import authentication from "../../common/middleware/authentication";

routes.post("/add-note", asyncWrap(noteController.addNote));

routes.put("/edit-note/:noteId", asyncWrap(noteController.editNote));

routes.delete(
  "/delete-note/:noteId",
  authentication,
  asyncWrap(noteController.deletNote)
);

module.exports = routes;
