import { model, Schema } from "mongoose";
import type { IAddress, IBusiness, IClient } from "../domain/client-interface.ts";

const AddressSchema = new Schema<IAddress>(
  {
    city: { type: String, required: true, trim: true, default: "" },
    district: { type: String, required: true, trim: true, default: "" },
    number: { type: String, required: true, trim: true, default: "" },
    street: { type: String, required: true, trim: true, default: "" },
    zip_code: { type: String, required: false, trim: true, default: "" },
  },
  { _id: false },
);

const BusinessSchema = new Schema<IBusiness>(
  {
    cnpj: { type: String, trim: true, required: false, default: "" },
    company_name: { type: String, trim: true, required: true },
  },
  { _id: false },
);

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    address: { type: AddressSchema, required: false },
    business: { type: BusinessSchema, required: false },
    phone: { type: String, required: false, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Client = model<IClient>("Client", ClientSchema);
export default Client;
