import mongoose from "mongoose";
import { sendNotification } from "../../restful/controllers/notification";

const movementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
  creatorId: { type: String, required: true },
  actors: { type: [String], required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Movement = mongoose.model("Movement", movementSchema);
const changeStream = Movement.watch();

changeStream.on("change", (change) => {
  if (change.operationType === "insert") {
    const actors: string[] = change.fullDocument.actors;
    actors.forEach((actor) => {
      sendNotification(
        `${change.fullDocument.creator} has invited you to join the movement ${change.fullDocument.title}`,
        "JOIN_MOVEMENT",
        actor
      );
    });
  }
});

export default Movement;
