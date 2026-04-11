import { Schema, model } from "mongoose";
import type { IPackaging } from "../domain/packaing-interface.ts";
import { PRODUCT_CATEGORIES, type IProduct } from "../domain/product-interface.ts";

const PackagingSchema = new Schema<IPackaging>(
  {
    primary_type: { type: String, required: true },
    secondary_type: { type: String, default: null },
    secondary_qty: { type: Number, min: 1, default: null },
    unit_type: { type: String, required: true },
    unit_qty: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

// --- Schema principal ---

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    maker: { type: String, required: true },
    provider: { type: String, required: true },
    category: { type: String, required: true, enum: PRODUCT_CATEGORIES },
    purchase_value: { type: Number, required: true, min: 0 },
    percentage: { type: Number, required: true, min: 0 },
    sale_value: { type: Number, required: true, min: 0 },
    stock_quantity: { type: Number, required: true, min: 0, default: 0 },
    stock_units: { type: Number, required: true, min: 0, default: 0 },
    packaging: { type: PackagingSchema, required: true },
    updated_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.id;
      },
    },
    toObject: { virtuals: true },
  },
);

// --- Virtual: total de unidades mínimas em estoque ---
// Com secondary:  (stock_quantity × secondary_qty × unit_qty) + (stock_units × unit_qty)
// Sem secondary:  stock_quantity × unit_qty

ProductSchema.virtual("total_units").get(function (this: IProduct) {
  const { secondary_qty, unit_qty } = this.packaging;
  if (secondary_qty && secondary_qty > 0) {
    const units_from_closed = this.stock_quantity * secondary_qty * unit_qty;
    const units_from_loose = this.stock_units * unit_qty;
    return units_from_closed + units_from_loose;
  }
  return this.stock_quantity * unit_qty;
});

// --- Virtual: preço de venda por secondary (calculado automaticamente) ---
// unit_sale_value = sale_value ÷ secondary_qty
// Retorna null se o produto não tem secondary (não é vendido avulso)

ProductSchema.virtual("unit_sale_value").get(function (this: IProduct) {
  const { secondary_qty } = this.packaging;
  if (secondary_qty && secondary_qty > 0) {
    return this.sale_value / secondary_qty;
  }

  return null;
});

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
