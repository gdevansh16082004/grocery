import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  price: number;
  quantity: number;
  images: string[]; // Allow multiple images
  description: string;
  seller: mongoose.Schema.Types.ObjectId; // Reference to Seller model
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true }, // Added 'name' field
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [String], required: true }, // Allow multiple images
    description: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "Seller", required: true }, // Ensure every item has a seller
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
