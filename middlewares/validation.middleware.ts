import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      const message = error.issues
        .map((e: any) => `${e.path.join(".")} ${e.message.toLowerCase()}`)
        .join(", ");

      return res.status(400).json({
        success: false,
        message,
      });
    }
  };
