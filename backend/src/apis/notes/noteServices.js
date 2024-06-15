import Note from "../../../model/note";
import { BadRequestException } from "../../common/exceptions/errorException";
import NoteResource from "./resources/noteResource";

class noteServices {
  /**
   * @description: Add Note
   * @param {*} data
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async addNote(data, auth, req, res) {
    try {
      const createNote = await Note.create({
        ...data,
        userId: auth,
      });

      return {
        ...new NoteResource(createNote),
      };
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description: Edit Note
   * @param {*} data
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async editNote(id, data, auth, req, res) {
    console.log(id);
    console.log(data);
    try {
      const updatedNote = await Note.findOneAndUpdate(
        { _id: id },
        {
          ...data,
        },
        { new: true }
      );

      console.log(updatedNote);

      return {
        ...new NoteResource(updatedNote),
      };
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description: Delete Note
   * @param {*} req
   * @returns
   */
  static async deletNote(req) {}
}

export default noteServices;
