import mongoose from "mongoose";
import { agenda } from "../config";

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  imgUrl: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["personal", "business"],
    default: "personal",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Profile = mongoose.model("Profile", profileSchema);

const changeStream = Profile.watch();

changeStream.on("change", async (change) => {
  if (change.operationType === "insert") {
    try {
      await agenda.start();
      agenda.define<{ id: string }>("DeleteProfile", async (job, done) => {
        try {
          await Profile.findByIdAndDelete(job.attrs.data.id);
          await job.remove();
        } catch (error: any) {
          console.log(error.message);
        }
        done();
      });
      await agenda.schedule<{ id: string }>("in 1 week", "DeleteProfile", {
        id: change.fullDocument._id,
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
});

export default Profile;
