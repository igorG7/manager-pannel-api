import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.ts";
import { STOCK_MOVEMENT } from "../domain/stock-interface.ts";

export const movementStock = (req: Request, res: Response, next: NextFunction) => {
  const validators = {
    product_id: { type: "string", required: false },
    type: { type: "string", required: false, enum: STOCK_MOVEMENT },
    start_date: { type: "string", required: false },
    end_date: { type: "string", required: false },
  };

  Key.validate(validators, req.query);

  next();
};
