import express, { IRouter } from 'express';
import NoteValidator from '../validators/note.validator';
import NoteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

class NoteRoutes {
  private NoteController = new NoteController();
  private router = express.Router();
  private NoteValidator = new NoteValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to create a note
    this.router.post(
      '/createnote',
      userAuth,
      this.NoteController.createNote
    );

    //route to read a note
    this.router.get(
      '/readnote',
      userAuth,
      this.NoteValidator.id,
      this.NoteController.readNote
    );

    //route to read all notes
    this.router.get(
      '/readnotes',
      userAuth,
      this.NoteController.readNotes
    );

    //route to update a note
    this.router.patch(
      '/updatenote',
      userAuth,
      this.NoteValidator.data,
      this.NoteController.updateNote
    );

    //route to delete a note
    this.router.delete(
      '/deletenote',
      userAuth,
      this.NoteValidator.id,
      this.NoteController.deleteNote
    );

    //route to delete all notes
    this.router.delete(
      '/deletenotes',
      userAuth,
      this.NoteController.deleteNotes
    );

    //route to view trash
    this.router.get(
      '/trash',
      userAuth,
      this.NoteController.trash
    );

    //route to archive a note 
    this.router.post(
      '/archive',
      userAuth,
      this.NoteValidator.id,
      this.NoteController.archive
    );
    //route to view all archives 
    this.router.get(
      '/archives',
      userAuth,
      this.NoteController.archives
    );
  };

  public getRoutes = (): IRouter => 
    this.router;
}

export default NoteRoutes;
