import { Schema, model } from "mongoose";
import { STOCK_MOVEMENT, type IStockMovement } from "../domain/stock-interface.ts";

const StockMovementSchema = new Schema<IStockMovement>(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    type: { type: String, enum: STOCK_MOVEMENT, required: true },
    quantity: { type: Number, required: true, min: [1, "Quantity must be at least 1"] },
    date: { type: Date, default: Date.now },
    note: { type: String, trim: true },
  },
  { timestamps: false },
);

const StockMovement = model<IStockMovement>("StockMovement", StockMovementSchema);
export default StockMovement;
