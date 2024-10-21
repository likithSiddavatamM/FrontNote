import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

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

    // //route to create a note
    // this.router.post(
    //   '/createnote',
    //   userAuth,
    //   this.UserController.createNote
    // );

    // //route to read a note
    // this.router.post(
    //   '/readnote',
    //   userAuth,
    //   this.UserValidator.id,
    //   this.UserController.readNote
    // );

    // //route to read all notes
    // this.router.post(
    //   '/readnotes',
    //   userAuth,
    //   // this.UserValidator.email,
    //   this.UserController.readNotes
    // );

    // //route to update a note
    // this.router.post(
    //   '/updatenote',
    //   userAuth,
    //   this.UserValidator.data,
    //   this.UserController.updateNote
    // );

    // //route to delete a note
    // this.router.post(
    //   '/deletenote',
    //   userAuth,
    //   this.UserValidator.id,
    //   this.UserController.deleteNote
    // );

    // //route to delete all notes
    // this.router.post(
    //   '/deletenotes',
    //   userAuth,
    //   this.UserValidator.email,
    //   this.UserController.deleteNotes
    // );

    // //route to view trash
    // this.router.post(
    //   '/trash',
    //   userAuth,
    //   this.UserValidator.email,
    //   this.UserController.trash
    // );

    // //route to archive a note 
    // this.router.post(
    //   '/archive',
    //   userAuth,
    //   this.UserValidator.id,
    //   this.UserController.archive
    // );
    // //route to view all archives 
    // this.router.post(
    //   '/archives',
    //   userAuth,
    //   this.UserValidator.email,
    //   this.UserController.archives
    // );
  };

  public getRoutes = (): IRouter => 
     this.router;
}

export default UserRoutes;
