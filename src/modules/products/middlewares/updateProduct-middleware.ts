import type { Request, Response, NextFunction } from "express";
import { PRODUCT_CATEGORIES, type IProduct } from "../domain/product-interface.ts";
import { verifyMinEntry } from "../../shared/utils/validations/minEntry.ts";
import { Key } from "../../shared/utils/validations/key.ts";

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const validators = {
    name: { type: "string", required: false },
    description: { type: "string", required: false },
    maker: { type: "string", required: false },
    provider: { type: "string", required: false },
    category: { type: "string", required: false, enum: PRODUCT_CATEGORIES },
    purchase_value: { type: "number", required: false },
    percentage: { type: "number", required: false },
    sale_value: { type: "number", required: false },
    stock_quantity: { type: "number", required: false },
    stock_units: { type: "number", required: false },
    updated_by: { type: "string", required: true }, // TODO: remover após JWT

    packaging: {
      type: "object",
      required: false,
      fields: {
        primary_type: { type: "string", required: false },
        secondary_type: { type: "string", required: false },
        secondary_qty: { type: "number", required: false },
        unit_type: { type: "string", required: false },
        unit_qty: { type: "number", required: false },
      },
    },
  };

  Key.validate(validators, body);

  next();
};
