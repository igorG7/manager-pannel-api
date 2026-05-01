import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.ts";

export const readClient = (req: Request, res: Response, next: NextFunction) => {
  const { page: _p, limit: _l, ...filters } = req.query;

  const validators = {
    name: { type: "string", sanitize: "text" },
    email: { type: "string", sanitize: "text" },
    phone: { type: "string", sanitize: "text" },
    active: { type: "boolean" },

    business: {
      type: "object",
      fields: {
        company_name: { type: "string", sanitize: "text" },
      },
    },
  };

  Key.normalize(validators, filters);
  Key.validate(validators, filters);

  next();
};
