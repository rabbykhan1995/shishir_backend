import { UserInToken } from "../types/user.type";

declare global {
  namespace Express {
    interface Request {
      user?: UserInToken;
    }
  }
}

export {};
