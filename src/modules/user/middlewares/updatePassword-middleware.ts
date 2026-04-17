import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../domain/user-interface.ts";
import { Key } from "../../shared/utils/validations/key.ts";
import { Password } from "../../shared/utils/password/password.ts";
import { BadRequest } from "../../../shared/utils/appErrors.ts";

export const updatePassword = (req: Request, res: Response, next: NextFunction) => {
  const body: Partial<IUser> = req.body;

  if (!Password.isStrong(req.body.password))
    throw new BadRequest("Senha informada não atende os requisitos mínimos de segurança.");

  const validators = {
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  };

  Key.validate(validators, body);

  next();
};
