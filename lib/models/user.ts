import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  password?: string;
  orders: mongoose.Schema.Types.ObjectId[];
  
  cart: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String, required: true, default: "https://example.com/default-image.png" }, // ✅ Default image added
    password: { type: String, required: false },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    
    cart: [{ type: Object, ref:"Item" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
