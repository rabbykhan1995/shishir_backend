import { Request, Response } from "express";
import User from "../models/user.model";
import {
  UserResponse,
  CreateUserInput,
  UpdateUserInput,
} from "../types/user.type";
import { UserInToken } from "../types/user.type";
import Helper from "../utils/helper";
import { Types } from "mongoose";
import { ApiError } from "../utils/ApiError";
import axios from "axios";

export class UserController {
  constructor() {
    // future dependency injection এর জন্য reserved
  }

  static async registerManually(req: Request, res: Response) {
    const payload: CreateUserInput = req.body;

    const existedEmail = await User.findOne({ email: payload.email });
    if (existedEmail) {
      throw new ApiError(409, "Email already exists");
    }

    if (payload.mobile) {
      const existedMobile = await User.findOne({ mobile: payload.mobile });

      if (existedMobile) {
        throw new ApiError(409, "Mobile already exists");
      }
    }

    const hashedPassword: string = await Helper.hashPassword(
      payload.password as string,
    );
    const user: UserResponse = await User.create({
      ...payload,
      password: hashedPassword,
    });

    if (!user) {
      throw new ApiError(500, "User registration failed");
    }

    const token: string = Helper.generateToken(user);
    // Cookie সেট
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).json({
      success: true,
      msg: "Registration successful",
      data: user,
      token,
    });
  }
  static async getGoogleAuthAPI(req: Request, res: Response) {
    const redirectURL =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        redirect_uri: "http://localhost:5000/api/user/google-auth-callback",
        response_type: "code",
        scope: "openid email profile",
        state: "google_private_random_string_you_can_give_anything",
      });

    res.redirect(redirectURL);
  }

  static async googleAuthCallbackAPI(req: Request, res: Response) {
    const code = req.query.code as string;

    if (!code) {
      throw new ApiError(400, "Authorization code missing");
    }

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: "http://localhost:5000/api/user/google-auth-callback",
        grant_type: "authorization_code",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const googleUser = userInfoResponse.data;

    let user = await User.findOne({ openID: googleUser.id });

    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        openID: googleUser.id,
        image: googleUser.picture,
      });
    }

    const token = Helper.generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      admin: user.admin,
    });

    res.cookie("token", token, { httpOnly: true });

    res.redirect("http://localhost:3000");
  }
  static async registerWithGoogle(req: Request, res: Response) {
    const payload: CreateUserInput = req.body;

    const existedEmail = await User.findOne({ email: payload.email });
    if (existedEmail) {
      throw new ApiError(409, "Email already exists");
    }

    if (payload.mobile) {
      const existedMobile = await User.findOne({ mobile: payload.mobile });

      if (existedMobile) {
        throw new ApiError(409, "Mobile already exists");
      }
    }

    const hashedPassword: string = await Helper.hashPassword(
      payload.password as string,
    );
    const user: UserResponse = await User.create({
      ...payload,
      password: hashedPassword,
    });

    if (!user) {
      throw new ApiError(500, "User registration failed");
    }

    const token: string = Helper.generateToken(user);

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).json({
      success: true,
      msg: "Registration successful",
      data: user,
      token,
    });
  }

  static async getProfileData(req: Request, res: Response) {
    const userID: Types.ObjectId = req.user!._id;

    const user: UserResponse | null = await User.findById(userID);

    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    return res
      .status(200)
      .json({ msg: "user fetched successfully", data: user, success: true });
  }
}
