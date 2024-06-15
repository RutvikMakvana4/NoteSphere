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
  static async editNote(data, req, res) {}

  /**
   * @description: Delete Note
   * @param {*} req
   * @returns
   */
  static async deletNote(req) {}
}

export default noteServices;
