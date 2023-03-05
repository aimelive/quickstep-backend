import { JobAttributesData } from "agenda";
import otpGenerator from "otp-generator";
import { agenda } from "../database/config";
import TempOTP from "../database/models/temp_otp";

interface DeleteOTP extends JobAttributesData {
  id: string;
}

const DELETE_OTP = "DELETE_OTP";
export default class OTPService {
  /// Generating new OTP
  static generateOTP = async (email: string) => {
    try {
      const uniqueNumber = otpGenerator.generate(4, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      await TempOTP.create({
        email: email,
        otp: Number(uniqueNumber),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  /// Deleting OTP after two hours
  static deleteOTP = async (id: string) => {
    try {
      await agenda.start();
      agenda.define<DeleteOTP>(DELETE_OTP, async (job, done) => {
        await TempOTP.findByIdAndDelete(job.attrs.data.id);
        done();
        await job.remove();
      });
      // await agenda.now(DELETE_OTP, { id });
      await agenda.schedule<DeleteOTP>("in 2 hours", DELETE_OTP, { id });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  static getOTP = async (otp: { email: string; otp: number }) => {
    return await TempOTP.findOne(otp);
  };

  static checkUserOTP = async (email: string) => {
    return await TempOTP.findOne({ email });
  };
}
