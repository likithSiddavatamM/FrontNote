import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    //route to create a new user
    this.router.post(
      '/register',
      this.UserValidator.RegUser,
      this.UserController.RegUser
    );

    //route to login
    this.router.post(
      '/login',
      this.UserValidator.LogUser,
      this.UserController.LogUser
    );
  };

  public getRoutes = (): IRouter => 
     this.router;
}

export default UserRoutes;
