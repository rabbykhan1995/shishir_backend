import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserInToken } from "../types/user.type";
import { ApiError } from "../utils/ApiError";

interface AuthRequest extends Request {
  user?: UserInToken;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1️⃣ Token from header (Authorization: Bearer <token>)
    let token: string | undefined;

    if (req.headers.token) {
      token = req.headers.token as string | undefined;
    }

    // 2️⃣ Token from cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.clearCookie("token");
      throw new ApiError(401, "Unauthorized request");
    }

    // 3️⃣ Verify token
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("JWT_SECRET is not defined in .env");

    const decoded = jwt.verify(token, secret) as UserInToken;

    if (!decoded) {
      res.clearCookie("token");
      throw new ApiError(401, "Unauthorized request");
    }
    // 4️⃣ Attach user to request
    req.user = decoded;

    next();
  } catch (error: any) {
    res.clearCookie("token");
    throw new ApiError(401, "Unauthorized request");
  }
};
