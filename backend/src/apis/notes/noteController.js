import noteServices from "./noteServices";

class noteController {
  /**
   * @description: Add Note
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async addNote(req, res) {
    const data = await noteServices.addNote(req.body, req.user, req, res);
    return res.send({ message: "Add Notes successfully", data });
  }

  /**
   * @description: Edit Note
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async editNote(req, res) {
    const data = await noteServices.editNote(req.body, req, res);
    return res.send({ message: "Edit Notes successfully", data });
  }

  /**
   * @description: Delete Note
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deletNote(req, res) {
    await noteServices.deletNote(req);
    return res.send({ message: "Delete Notes successfully" });
  }
}

export default noteController;
