/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

    //Register a user
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
          message: `User with name ${data.firstName} ${data.lastName} is been created successfully, you can login using ${data.email}`
        });}
        
      } catch (error) {
        {res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });}
      }
    };

    //LogIn user
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
          message: `You are now loggedIn as ${data.firstName} ${data.lastName}`,
          acessToken:`${data.AccessToken}`
        });}
      } catch (error) {
        {res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });}}
    };
}

export default UserController;