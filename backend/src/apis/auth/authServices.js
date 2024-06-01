import AccessToken from "../../../model/accessToken";
import RefreshToken from "../../../model/refreshToken";
import { BCRYPT, JWT } from "../../common/constants/constants";
import { randomStringGenerator } from "../../common/helper";
import User from "../../../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../../src/common/exceptions/errorException";
import RegisterResource from "./resources/registerResource";
class authServices {
  /**
   * @description: Register
   * @param {*} data
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async register(data, req, res) {
    const { fullName, email, password } = data;
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      throw new ConflictException(
        "This user is already register | please login here"
      );
    } else {
      const hashPass = await bcrypt.hash(password, BCRYPT.SALT_ROUND);
      const userRegister = await User.create({
        fullName: fullName,
        email: email,
        password: hashPass,
      });

      const authentication = await authServices.generateTokenPairs(
        userRegister._id
      );

      return { ...new RegisterResource(userRegister), authentication };
    }
  }

  /**
   * @description: Login
   * @param {*} data
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async login(data, req, res) {
    const { email, password } = data;
    const findUser = await User.findOne({
      email: email,
    });
    if (!findUser)
      throw new NotFoundException(
        "This email id is not registered. please register first"
      );

    const isPasswordMatch = await bcrypt.compare(password, findUser.password);
    if (!isPasswordMatch) throw new BadRequestException("Invalid password");

    const authentication = await authServices.generateTokenPairs(findUser._id);
    return { ...new RegisterResource(findUser), authentication };
  }

  /**
   * @description: Logout
   * @param {*} req
   * @returns
   */
  static async logout(req) {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const decodedData = await JSON.parse(decodedToken.data);
    const findToken = await AccessToken.findOne({
      token: decodedData.jti,
    });
    if (!findToken) {
      throw new UnauthorizedException(
        "This access token is expired , please login !"
      );
    }
    await AccessToken.findByIdAndDelete({ _id: findToken._id });
    await RefreshToken.findOneAndDelete({
      accessToken: findToken.token,
    });
    return;
  }

  /**
   * @description: Generate token pairs
   * @param {*} authUser
   * @returns
   */
  static async generateTokenPairs(authUser) {
    const { accessToken, expiresAt } = await this.generateAccessToken(authUser);
    if (accessToken) {
      var refreshToken = await this.generateRefreshToken(accessToken);
    }
    return { accessToken, refreshToken, expiresAt };
  }

  /**
   * @description: Generate Access token
   * @param {*} user
   * @returns
   */
  static async generateAccessToken(user) {
    const jti = randomStringGenerator();
    const data = await JSON.stringify({ user, jti });
    const accessToken = jwt.sign({ data }, JWT.SECRET, {
      expiresIn: JWT.EXPIRES_IN,
    });
    const decodedToken = jwt.decode(accessToken);
    // store : access token
    await AccessToken.create({
      token: jti,
      userId: user,
    });
    return { accessToken, expiresAt: decodedToken.exp };
  }

  /**
   * @description: Generate Refresh token
   * @param {*} accessToken
   * @returns
   */
  static async generateRefreshToken(accessToken) {
    const refreshToken = randomStringGenerator();
    const decodedToken = jwt.decode(accessToken);
    const accessJti = await JSON.parse(decodedToken.data);

    await RefreshToken.create({
      token: refreshToken,
      accessToken: accessJti.jti,
    });
    return refreshToken;
  }
}

export default authServices;
