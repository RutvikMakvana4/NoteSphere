import Note from "../../../model/note";
import { BadRequestException } from "../../common/exceptions/errorException";
import NoteResource from "./resources/noteResource";
import NoteListResource from "./resources/noteListResource";

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
    try {
      const updatedNote = await Note.findOneAndUpdate(
        { _id: id },
        {
          ...data,
        },
        { new: true }
      );

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
  static async deletNote(id, auth, req, res) {
    await Note.findByIdAndDelete(id);
    return;
  }

  /**
   * @description: Note List
   * @param {*} query
   * @param {*} req
   * @param {*} res
   */
  static async noteList(query, auth, req, res) {
    const page = parseInt(query.page) - 1 || 0;
    const pageLimit = parseInt(query.limit) || 20;

    const noteList = await Note.find({ userId: auth });

    const totalDocument = await Note.find({ userId: auth }).countDocuments();

    const meta = {
      total: totalDocument,
      perPage: pageLimit,
      currentPage: page + 1,
      lastPage: Math.ceil(totalDocument / pageLimit),
    };

    return { data: new NoteListResource(noteList).notes, meta };
  }

  /**
   * @description: Search Notes
   * @param {*} query
   * @param {*} req
   * @param {*} res
   */
  static async searchNote(query, auth, req, res) {
    const page = parseInt(query.page) - 1 || 0;
    const pageLimit = parseInt(query.limit) || 20;
    const search = query.search;

    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: ".*" + search + ".*", $options: "i" } },
          { content: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      };
    }

    const noteList = await Note.find({
      userId: auth,
      ...searchQuery,
    });

    const totalDocument = await Note.find({ userId: auth }).countDocuments();

    const meta = {
      total: totalDocument,
      perPage: pageLimit,
      currentPage: page + 1,
      lastPage: Math.ceil(totalDocument / pageLimit),
    };

    return { data: new NoteListResource(noteList).notes, meta };
  }
}

export default noteServices;
