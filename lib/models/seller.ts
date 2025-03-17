import mongoose, { Schema, Document } from "mongoose";

export interface ISeller extends Document {
    name: string;
    email: string;
    password: string;
    orders: mongoose.Schema.Types.ObjectId[];  // Reference to Order model
    address: string;
    operatingHours: string;
    contact: string;

    createdAt: Date;
    updatedAt: Date;
}

const SellerSchema = new Schema<ISeller>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],  // Array of order references
    address: { type: String, required: true },
    operatingHours: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Seller || mongoose.model<ISeller>("Seller", SellerSchema);
