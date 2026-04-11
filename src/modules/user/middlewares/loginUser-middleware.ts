import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../domain/user-interface.ts";
import { Key } from "../../shared/utils/validations/key.ts";

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const body: Partial<IUser> = req.body;

  const keys = Object.keys(body);
  if (!keys.length) throw new Error("Nenhuma informação para cadastro foi enviada.");

  const validators = {
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  };

  Key.validate(validators, body);

  next();
};
