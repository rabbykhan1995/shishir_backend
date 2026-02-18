import slugify from "slugify";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserInToken } from "../types/user.type";
dotenv.config();
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_SECRET = process.env.BCRYPT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export default class Helper {
  static randomSuffix(): string {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    const l2 = letters[Math.floor(Math.random() * letters.length)];
    const number = Math.floor(1 + Math.random() * 1000);

    return `${l1}${number}${l2}`;
  }

  static generateSlug(title: string): string {
    return slugify(title, {
      lower: true,
      strict: true,
    });
  }

  static generateToken(user: UserInToken): string {
    return jwt.sign(user, JWT_SECRET!, {
      // <-- note the !
      expiresIn: "1d",
    });
  }

  static verifyToken(token: string): UserInToken | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET!) as UserInToken;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // security factor
    const hashed = await bcrypt.hash(password + BCRYPT_SECRET, saltRounds);
    return hashed;
  }

  // 2️⃣ Compare Password
  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password + BCRYPT_SECRET, hashedPassword);
  }
}
