import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for the Order Model
export interface IOrders extends Document {
  items: {
    item: Types.ObjectId; // Reference to Item model
    quantity: number;
  }[]; // Array of items
  bill: number;
  deliverySlot: string;
  address: string;
  seller: Types.ObjectId; // Reference to Seller model
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered" | "Cancelled"; // Order Status
  createdAt: Date;
  updatedAt: Date;
}

// Orders Schema
const OrdersSchema = new Schema<IOrders>(
  {
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ], // Array of item references with quantity
    bill: { type: Number, required: true },
    deliverySlot: { type: String, required: true },
    address: { type: String, required: false },
    seller: { type: Schema.Types.ObjectId, ref: "Seller", required: true }, // Reference to Seller model
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// ✅ Indexes for better query performance
OrdersSchema.index({ seller: 1 });
OrdersSchema.index({ createdAt: -1 });

export default mongoose.models.Order || mongoose.model<IOrders>("Order", OrdersSchema);
