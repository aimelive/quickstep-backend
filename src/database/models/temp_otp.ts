import mongoose from "mongoose";
import { deleteOTP } from "../../services/otp";
import { sendEmail } from "../../services/send_mail";

const tempOTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
});

const TempOTP = mongoose.model("TempOTP", tempOTPSchema);

const changeStream = TempOTP.watch();

changeStream.on("change", (change) => {
  if (change.operationType === "insert") {
    //Send an email notification
    const { email, otp } = change.fullDocument;
    // console.log();
    sendEmail(email, otp);
    //Schedule a task to delete this in 2 hours
    deleteOTP(change.fullDocument._id);
  }
});

export default TempOTP;
