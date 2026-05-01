import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.ts";
import type { IClient } from "../domain/client-interface.ts";

export const createClient = (req: Request, res: Response, next: NextFunction) => {
  const body: IClient = req.body;

  const validators = {
    name: { type: "string", required: true, sanitize: "text" },
    email: { type: "string", required: true, sanitize: "text" },
    phone: { type: "string", sanitize: "text" },
    active: { type: "boolean" },
    address: {
      type: "object",
      fields: {
        street: { type: "string", required: true, sanitize: "text" },
        number: { type: "string", required: true, sanitize: "text" },
        district: { type: "string", required: true, sanitize: "text" },
        city: { type: "string", required: true, sanitize: "text" },
        zip_code: { type: "string", sanitize: "text" },
      },
    },
    business: {
      type: "object",
      fields: {
        company_name: { type: "string", required: true, sanitize: "text" },
        cnpj: { type: "string", sanitize: "text" },
      },
    },
  };

  Key.validate(validators, body);

  next();
};
