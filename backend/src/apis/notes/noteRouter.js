import express from "express";
import asyncWrap from "express-async-wrapper";
import noteController from "./noteController";
import validator from "../../common/config/joiValidation";
import authentication from "../../common/middleware/authentication";
import { NoteDto } from "./dtos/noteDto";

const routes = express.Router();

routes.post(
  "/add-note",
  authentication,
  validator.body(NoteDto),
  asyncWrap(noteController.addNote)
);

routes.put(
  "/edit-note/:id",
  authentication,
  asyncWrap(noteController.editNote)
);

routes.delete(
  "/delete-note/:id",
  authentication,
  asyncWrap(noteController.deletNote)
);

routes.get("/note-list", authentication, asyncWrap(noteController.noteList));

module.exports = routes;
