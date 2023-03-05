import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Respond from "../respond";

export default class MovementValidate {
  static create(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      title: Joi.string().required().min(3).max(80),
      description: Joi.string().required().min(5).max(150),
      creator: Joi.string().required().min(5).max(40),
      actors: Joi.array().items(Joi.string().min(5)).required(),
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
