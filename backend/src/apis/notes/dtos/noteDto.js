import Joi from "joi";

export const NoteDto = Joi.object().keys({
  title: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  tags: Joi.array().optional(),
});
