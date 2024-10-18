/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';
import { error } from 'winston';
import { object } from '@hapi/joi';

class UserController {
  public UserService = new userService();

    public RegUser = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.UserService.newUser(req.body);
        if(data)
        {res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          message: `User with name ${data.firstName} ${data.lastName} is been created successfully, you can loggin using ${data.email}`
        });}
        
      } catch (error) {
        {res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });}
      }
    };

    public LogUser = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.UserService.logging(req.body);
        if(typeof(data)=="object")
        {res.status(200).json({
          code: HttpStatus.CREATED,
          message: `You are now loggedIn as ${data.firstName} ${data.lastName}`
        });}
      } catch (error) {
        {res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });}}
    };

}

export default UserController;
