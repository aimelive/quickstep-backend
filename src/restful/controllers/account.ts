import { Response, Request } from "express";
import Account from "../../database/models/account";
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
}
