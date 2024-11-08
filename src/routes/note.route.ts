import express, { IRouter } from 'express';
import NoteValidator from '../validators/note.validator';
import NoteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { cache } from '../middlewares/cache.middleware';

class NoteRoutes {
  private NoteController = new NoteController();
  private router = express.Router();
  private NoteValidator = new NoteValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to crate a note
    this.router.post(
      '/createnote',
      userAuth,
      this.NoteValidator.uData,
      this.NoteController.createNote  
    );

    //route to read a note
    this.router.get(
      '/readnote/:id',
      userAuth,
      this.NoteValidator.id,
      this.NoteController.readNote
    );

    //route to read all notes
    this.router.get(
      '/readnotes',
      userAuth,
      cache,
      this.NoteController.readNotes
    );

    //route to update a note
    this.router.put(
      '/updatenote/:id',
      userAuth,
      this.NoteValidator.data,
      this.NoteController.updateNote
    );

    //route to trash a note
    this.router.delete(
      '/trash/:id',
      userAuth,
      this.NoteValidator.id,
      this.NoteController.trash
    );

    //route to delete notes permanetly from trash
    this.router.delete(
      '/deletepermanetly/:id',
      userAuth,
      this.NoteValidator.id,
      this.NoteController.deletePermanetly
    );

    //route to archive a note 
    this.router.post(
      '/archive/:id',
      userAuth,
      this.NoteValidator.id,
      this.NoteController.archive
    );

    //route to view trashBin
    this.router.get(
      '/trashBin',
      userAuth,
      this.NoteController.trashBin
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