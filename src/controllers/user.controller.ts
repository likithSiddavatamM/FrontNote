/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';
import { error } from 'winston';
import { object } from '@hapi/joi';

class UserController {
  public UserService = new userService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  /* public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getAllUsers();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  }; */

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
/*   public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getUser(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  }; */

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
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
      if(data=="RegErr")
        throw new Error(`User with email ${req.body.email} doesn't exist, please go with the registration`);
      else
        throw new Error(`You have entered a incorrect paassword, try again`);

    } catch (error) {
      next(error);
    }
  };



  // /**
  //  * Controller to update a user
  //  * @param  {object} Request - request object
  //  * @param {object} Response - response object
  //  * @param {Function} NextFunction
  //  */
  // public updateUser = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<any> => {
  //   try {
  //     const data = await this.UserService.updateUser(req.params._id, req.body);
  //     res.status(HttpStatus.ACCEPTED).json({
  //       code: HttpStatus.ACCEPTED,
  //       data: data,
  //       message: 'User updated successfully'
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // *
  //  * Controller to delete a single user
  //  * @param  {object} Request - request object
  //  * @param {object} Response - response object
  //  * @param {Function} NextFunction
  //  */
  // public deleteUser = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<any> => {
  //   try {
  //     await this.UserService.deleteUser(req.params._id);
  //     res.status(HttpStatus.OK).json({
  //       code: HttpStatus.OK,
  //       data: {},
  //       message: 'User deleted successfully'
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default UserController;
