import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class NoteValidator {
  
  public id = (req: Request, res: Response, next: NextFunction): void => {
      const schema = Joi.object({
          id: Joi.string().required(),
      });
      const { error } = schema.validate(req.params);
      if (error) 
        res.status(400).json({Error:error.message});
      else
        next();
    };

  public email = (req: Request, res: Response, next: NextFunction): void => {
      const schema = Joi.object({
          email: Joi.string().required().email()
      });
      const { error } = schema.validate(req.body);
      if (error) 
        res.status(400).json({Error:error.message});
      else
        next();
    };

  public data = (req: Request, res: Response, next: NextFunction): void => {
      const schema = Joi.object({
          title:Joi.string(),
          description:Joi.string(),
          email : Joi.string()
      });
      const { error } = schema.validate(req.body);
      if (error) 
        res.status(400).json({Error:error.message});
      else
        next();
    };

    public uData = (req: Request, res: Response, next: NextFunction): void => {
      const schema = Joi.object({
          title:Joi.string(),
          description:Joi.string(),
          email : Joi.string()
      });
      const { error } = schema.validate(req.body);
      if (error) 
        res.status(400).json({Error:error.message});
      else
        next();
    };
}

export default NoteValidator;
