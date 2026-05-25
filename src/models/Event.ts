import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  tickets: number;
  ticketsAvailable: number;
  image: string;
  organizer: string;
  status: "active" | "draft" | "sold-out";
  ticketTypes: { name: string; price: number; available: number }[];
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, default: "19:00" },
    venue: { type: String, required: true },
    city: { type: String, default: "" },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tickets: { type: Number, required: true },
    ticketsAvailable: { type: Number, required: true },
    image: { type: String, default: "" },
    organizer: { type: String, default: "Eventix" },
    status: { type: String, enum: ["active", "draft", "sold-out"], default: "active" },
    ticketTypes: [
      {
        name: { type: String },
        price: { type: Number },
        available: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
