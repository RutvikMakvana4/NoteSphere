import authServices from "./authServices";

class authController {
  /**
   * @description: Register
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async register(req, res) {
    const data = await authServices.register(req.body, req, res);
    return res.send({ message: "User register successfully", data });
  }

  /**
   * @description: Login
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async login(req, res) {
    const data = await authServices.login(req.body, req, res);
    return res.send({ message: "Login successfully", data });
  }

  /**
   * @description: Logout
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async logout(req, res) {
    await authServices.logout(req);
    return res.send({ message: "Logged out successfully" });
  }
}

export default authController;
