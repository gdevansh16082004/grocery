import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  price: number;
  quantity: number;
  images: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<IItem>(
  {
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Items || mongoose.model<IItem>("User", ItemSchema);
