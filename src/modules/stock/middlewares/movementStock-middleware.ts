import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.ts";
import { STOCK_MOVEMENT } from "../domain/stock-interface.ts";

export const movementStock = (req: Request, res: Response, next: NextFunction) => {
  const validators = {
    product_id: { type: "string", required: true },
    type: { type: "string", required: true, enum: STOCK_MOVEMENT },
    quantity: { type: "number", required: true },
    date: { type: "string", required: true },
    note: { type: "string", required: false },
  };

  Key.validate(validators, req.body);

  next();
};
