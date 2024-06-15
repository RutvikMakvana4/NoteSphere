import User from "../../../model/user";
import { NotFoundException } from "../../../src/common/exceptions/errorException";
import UserProfileResource from "./resources/userResource";

class userServices {
  /**
   * @description: Logout
   * @param {*} req
   * @returns
   */
  static async userProfile(auth, req, res) {
    const findUser = await User.findById(auth);

    if (!findUser) {
      throw new NotFoundException("User not found");
    }

    return new UserProfileResource(findUser);
  }
}

export default userServices;
