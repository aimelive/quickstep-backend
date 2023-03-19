import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  action: { type: String, required: true },
  to: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
