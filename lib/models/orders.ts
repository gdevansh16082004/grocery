import mongoose, { Schema, Document } from "mongoose";
import { ISeller } from "./seller";

export interface IOrders extends Document {
  item: Object;
  quantity: number;
  bill: number;
  deliverySlot: string;
  seller: ISeller, 
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema = new Schema<IOrders>(
  {
    item: { type: Object, required: true },
    deliverySlot: {type: String, required: false},
    quantity: {type: Number, required: false},
    bill: {type: Number, required: false},
    seller: {type: mongoose.Schema.Types.ObjectId,
             ref: "Seller", required: false},
  },
  { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model<IOrders>("User", OrdersSchema);
