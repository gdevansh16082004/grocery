import mongoose, { Schema, Document } from "mongoose";

export interface ISeller extends Document {
    name: string;
    email: string;
    password?: string;
    orders: Object;
    Address: string;
    operatingHours: string;
    createdAt: Date;
    updatedAt: Date;
}

const SellerSchema = new Schema<ISeller>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    orders: { type: Object, required: false},
    Address: { type: String, required: false},
    operatingHours: { type: String, required: false}
  },
  { timestamps: true }
);

export default mongoose.models.Seller || mongoose.model<ISeller>("User", SellerSchema);
