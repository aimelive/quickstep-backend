import { Response, Request } from "express";
import Account from "../../database/models/account";
import OTPService from "../../services/otp";
import { sendEmail } from "../../services/send_mail";
import { hashPwd } from "../../utils/helpers";
import Respond from "../../utils/respond";

export default class UserController {
  // Getting all users
  static getAllUsers = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const users = await Account.find();
      return respond.success(200, {
        message: "Users retrieved successfully",
        count: users.length,
        data: users,
      });
    } catch (error) {
      return respond.error(error);
    }
  };

  //Creaeting new account
  static createAccount = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const password = await hashPwd(req.body.password);
      const account = await Account.create({ ...req.body, password });
      return respond.success(201, {
        message: "Account created successfully, verify email",
        data: account,
      });
    } catch (error: any) {
      return respond.error(error);
    }
  };

  static verifyEmail = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const { email, otp } = req.body;
      const result = await OTPService.getOTP({ email, otp });

      if (!result) throw new Error("OTP not found");

      const data = await Account.findOneAndUpdate(
        { email: result.email },
        { verified: true },
        { new: true }
      );

      if (!data) throw new Error("Account not found");

      return respond.success(200, {
        message: "Account verified successfully, create profile",
        data,
      });
    } catch (error) {
      return respond.error(error);
    }
  };

  static resendOTP = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const { email } = req.body;
      const result = await OTPService.checkUserOTP(email);

      if (!result) {
        await OTPService.generateOTP(email);
        return respond.success(200, {
          message: "OTP sent successfully",
          data: undefined,
        });
      }
      sendEmail(result.email, result.otp);

      return respond.success(200, {
        message: "OTP resent successfully",
        data: undefined,
      });
    } catch (error) {
      return respond.error(error);
    }
  };
}
