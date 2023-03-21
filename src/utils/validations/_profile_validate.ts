import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Respond from "../respond";

export default class ProfileValidate {
  static getMultiple(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      users: Joi.array().items(Joi.string().min(5)).required().min(1),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return new Respond(res).success(400, {
        message: error.details[0].message.replace(/"/g, ""),
        data: undefined,
      });
    }
    next();
  }
}
