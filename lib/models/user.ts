import mongoose, { Schema, Document, trusted } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  password?: string;
  orders: Object;
  Address: string;
  cart: Object;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    password: { type: String, required: false },
    orders: { type: Object, required: false},
    Address: { type: String, required: false},
    cart: { type: Object, required: false}
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
