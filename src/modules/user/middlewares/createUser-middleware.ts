import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../domain/user-interface.ts";
import { Key } from "../../shared/utils/validations/key.ts";
import { Password } from "../../shared/utils/password/password.ts";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const body: IUser = req.body;

  const keys = Object.keys(body);
  if (!keys.length) throw new Error("Nenhuma informação para cadastro foi enviada.");

  const validators = {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },

    role: {
      type: "string",
      required: false, // tem default no model
      enum: ["ADMIN", "OPERATOR", "SELLER"],
    },
  };

  Key.validate(validators, body);

  const passwordIsStrong = Password.isStrong(body.password);
  if (!passwordIsStrong) throw new Error("A senha não atende os requisitos de segurança.");

  next();
};
