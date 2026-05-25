import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  eventId: string;
  eventName: string;
  ticketType: string;
  quantity: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    eventName: { type: String, required: true },
    ticketType: { type: String, default: "General Admission" },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["confirmed", "pending", "cancelled"], default: "confirmed" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
