import userServices from "./userServices";

class userController {
  /**
   * @description: User profile
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async userProfile(req, res) {
    const data = await userServices.userProfile(req.user, req, res);
    return res.send({ data });
  }
}

export default userController;
