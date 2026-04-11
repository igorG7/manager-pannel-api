import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;

  if (!Types.ObjectId.isValid(id)) throw new Error("ID inválido.");

  next();
};
