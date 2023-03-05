import mongoose from "mongoose";
import OTPService from "../../services/otp";

const accountSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
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

const Account = mongoose.model("Account", accountSchema);
const changeStream = Account.watch();

changeStream.on("change", async (change) => {
  if (change.operationType === "insert") {
    //Creata an OTP document in database
    await OTPService.generateOTP(change.fullDocument.email);
  }
});

export default Account;
