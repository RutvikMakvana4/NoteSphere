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
    const data = await noteServices.editNote(
      req.params.id,
      req.body,
      req.user,
      req,
      res
    );
    return res.send({ message: "Edit Notes successfully", data });
  }

  /**
   * @description: Delete Note
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deletNote(req, res) {
    await noteServices.deletNote(req.params.id, req.user, req, res);
    return res.send({ message: "Delete Notes successfully" });
  }

  /**
   * @description: Note List
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async noteList(req, res) {
    const { data, meta } = await noteServices.noteList(req.query, req, res);
    return res.send({
      message: "All notes retrived successfully",
      data: data,
      meta: meta,
    });
  }
}

export default noteController;
