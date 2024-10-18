import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public RegUser = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string()
        .min(2) // Minimum of 3 characters
        .required(),
      
      lastName: Joi.string()
        .min(2) // Minimum of 3 characters
        .required(),
      
      email: Joi.string()
        .email({ tlds: { allow: false } }) // Allow any valid email format
        .required()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/) // Valid email format
        .message('Email must be a valid format ending with .com!'),
      
      password: Joi.string()
        .min(10) // Minimum of 10 characters
        .required()
        .pattern(/^(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{10,}$/) // Password with at least one special character
        .message('Password must be at least 10 characters long and contain at least one special character!')
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  public LogUser = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } }) // Allow any valid email format
        .required()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/) // Valid email format
        .message('Email must be a valid format ending with .com!'),
      
      password: Joi.string()
        .min(10) // Minimum of 10 characters
        .required()
        .pattern(/^(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{10,}$/) // Password with at least one special character
        .message('Password must be at least 10 characters long and contain at least one special character!')
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

export default UserValidator;
