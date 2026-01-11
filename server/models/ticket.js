import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    queueId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    position: {
      type: Number,
      default: -1,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
