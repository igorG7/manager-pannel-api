import type { Types } from "mongoose";

export const STOCK_MOVEMENT = ["in", "out"] as const;
export type StockMovementType = (typeof STOCK_MOVEMENT)[number];

export interface IStockMovement {
  product_id: Types.ObjectId | string;
  type: StockMovementType;
  quantity: number;
  date: Date;
  note?: string;
}
