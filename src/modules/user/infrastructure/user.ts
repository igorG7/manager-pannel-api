import mongoose, { Schema } from "mongoose";
import type { IUser } from "../domain/user-interface.ts";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "OPERATOR", "SELLER"],
      default: "SELLER",
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    active: { type: Boolean, default: true },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  },
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
