/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { error } from 'winston';
import { object } from '@hapi/joi';

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
          message: `User with name ${data.firstName} ${data.lastName} is been created successfully, you can loggin using ${data.email}`
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

    //Create a note
    public createNote = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any>=>{try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      req.body.email=await jwt.decode(bearerToken.split(' ')[1]);;
      let data = await this.UserService.createNote(req.body);
      res.status(200).json(data);
    } catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    };

    //Read/Fetch a note
    public readNote = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.UserService.findNote(req.body.id))}
        catch (error) {
        res.status(400).json({Error:error.message});
      }
    }
    
    //Read/Fetch all notes
    public readNotes = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.UserService.findNotes(req.body.email))}
          
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }

    //Update a note
    public updateNote = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.UserService.updateNote(req.body))       
        }
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }

    //move note to trash
    public deleteNote = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json({RecordsDeleted:(await this.UserService.deleteNote(req.body.id)).nModified})       
        }
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }

    //Move all notes to trash
    public deleteNotes = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json({RecordsDeleted:(await this.UserService.deleteNotes(req.body.email)).nModified})       
        }
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }

    //View trash
    public trash = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.UserService.trash(req.body.email))      
        }
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }

    //Archive note
    public archive = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json({RecordsArchived:(await this.UserService.archive(req.body.id)).nModified})      
        }
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }

    //View all archives
    public archives = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.UserService.archives(req.body.email))   
        }
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }
}

export default UserController;


/*
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

  /*
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

  /* *
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */

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
