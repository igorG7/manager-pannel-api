import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.ts";
import type { IClient } from "../domain/client-interface.ts";
import { BadRequest } from "../../../shared/utils/appErrors.ts";

export const updateClient = (req: Request, res: Response, next: NextFunction) => {
  const body: Partial<IClient> = req.body;

  const validators = {
    name: { type: "string", sanitize: "text" },
    email: { type: "string", sanitize: "text" },
    phone: { type: "string", sanitize: "text" },
    active: { type: "boolean" },
    address: {
      type: "object",
      fields: {
        street: { type: "string", sanitize: "text" },
        number: { type: "string", sanitize: "text" },
        district: { type: "string", sanitize: "text" },
        city: { type: "string", sanitize: "text" },
        zip_code: { type: "string", sanitize: "text" },
      },
    },
    business: {
      type: "object",
      fields: {
        company_name: { type: "string", sanitize: "text" },
        cnpj: { type: "string", sanitize: "text" },
      },
    },
  };

  Key.validate(validators, body);
  req.body = normalizeNestedObject(body);

  next();
};

const normalizeNestedObject = (obj: any) => {
  const newBody: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      for (const [nestedKey, nestedValue] of Object.entries(value as any)) {
        newBody[`${key}.${nestedKey}`] = nestedValue;
      }
    } else {
      newBody[`${key}`] = value;
    }
  }

  return newBody;
};
