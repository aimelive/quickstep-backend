import mongoose from "mongoose";

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

export default Profile;
