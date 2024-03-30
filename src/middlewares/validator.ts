import { Request, Response, NextFunction } from "express";
//* Include all validators
import Validators from "../validations";
import { BadRequestException } from "../util/httpExceptions";

export const validator = (validator: string, section: string[] = ["body"]) => {
  //! If validator does not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let request = {};
      if (section.includes("body")) {
        request = { ...request, ...req.body };
      }
      if (section.includes("params")) {
        request = { ...request, ...req.params };
      }
      if (section.includes("query")) {
        request = { ...request, ...req.query };
      }

      const validated = await Validators[validator].validateAsync(request, {
        errors: {
          wrap: {
            label: "",
          },
        },
        abortEarly: false,
      });
      req.body = validated;
      next();
    } catch (err: any) {
      const message =
        err?.message?.split(". ") ||
        "Invalid request data. Please review request and try again.";
      const exception = new BadRequestException(message);

      return next(exception);
    }
  };
};
