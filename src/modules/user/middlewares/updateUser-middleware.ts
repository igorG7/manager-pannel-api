import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../domain/user-interface.ts";
import { Key } from "../../shared/utils/validations/key.ts";

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const body: Partial<IUser> = req.body;

  const validators = {
    email: { type: "string", required: false },
    name: { type: "string", required: false },
    role: { type: "string", required: false, enum: ["ADMIN", "OPERATOR", "SELLER"] },
    active: { type: "boolean", required: false },
  };

  Key.validate(validators, body);

  next();
};
