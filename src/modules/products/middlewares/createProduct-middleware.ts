import type { Request, Response, NextFunction } from "express";
import { PRODUCT_CATEGORIES, type IProduct } from "../domain/product-interface.ts";
import { Key } from "../../shared/utils/validations/key.ts";
import { PACKAGING_TYPES } from "../domain/packaing-interface.ts";

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const body: IProduct = req.body;

  const validators = {
    name: { type: "string", required: true },
    description: { type: "string", required: false },
    maker: { type: "string", required: true },
    provider: { type: "string", required: true },
    category: { type: "string", required: true, enum: PRODUCT_CATEGORIES },
    purchase_value: { type: "number", required: true },
    percentage: { type: "number", required: true },
    sale_value: { type: "number", required: true },
    stock_quantity: { type: "number", required: true },
    stock_units: { type: "number", required: false }, // default: 0 no model
    updated_by: { type: "string", required: true }, // TODO: remover após JWT

    packaging: {
      type: "object",
      required: true,
      fields: {
        primary_type: { type: "string", required: true, enum: PACKAGING_TYPES },
        secondary_type: { type: "string", required: false, enum: PACKAGING_TYPES },
        secondary_qty: { type: "number", required: false },
        unit_type: { type: "string", required: true },
        unit_qty: { type: "number", required: true },
      },
    },
  };

  Key.validate(validators, body);

  next();
};
