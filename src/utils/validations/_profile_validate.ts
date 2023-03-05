import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Respond from "../respond";

export default class ProfileValidate {
  static create(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      username: Joi.string().required().min(4).max(15),
      email: Joi.string().email().required(),
      type: Joi.string().valid("personal", "business"),
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
