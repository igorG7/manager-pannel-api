import type { Types } from "mongoose";
import type { IPackaging } from "./packaing-interface.ts";

export const PRODUCT_CATEGORIES = ["Descartáveis", "Embalagens Plásticas", "Isopor"] as const;
type CategoryType = (typeof PRODUCT_CATEGORIES)[number];

export interface IProduct {
  name: string;
  description?: string;
  maker: string;
  provider: string;
  category: CategoryType;
  purchase_value: number;
  percentage: number;
  sale_value: number;
  stock_quantity: number;
  stock_units: number;
  packaging: IPackaging;
  updated_by: Types.ObjectId | string;
  total_units?: number;
}
