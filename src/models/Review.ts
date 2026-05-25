import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userId: string;
  userName: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    eventId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
