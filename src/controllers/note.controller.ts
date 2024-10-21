/* eslint-disable @typescript-eslint/no-explicit-any */
import NoteService from '../services/note.service';
import { Request, Response, NextFunction } from 'express';

class NoteController {
  public NoteService = new NoteService();

    //Create a note
    public createNote = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any>=>{try {
      //req.body.email=await jwt.decode(req.header('Authorization').split(' ')[1]);
      res.status(200).json(await this.NoteService.createNote(req.body));
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
          //req.body.email=await jwt.decode(req.header('Authorization').split(' ')[1]);
          res.json(await this.NoteService.findNote(req.body))}
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
          res.json(await this.NoteService.findNotes(/*await jwt.decode(req.header('Authorization').split(' ')[1])*/req.body.email))}
          
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
          //req.body.email=await jwt.decode(req.header('Authorization').split(' ')[1]);
          res.json(await this.NoteService.updateNote(req.body))       
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
          //req.body.email=await jwt.decode(req.header('Authorization').split(' ')[1]);    
          res.json({RecordsDeleted:(await this.NoteService.deleteNote(req.body)).nModified})       
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
          res.json({RecordsDeleted:(await this.NoteService.deleteNotes(/*await jwt.decode(req.header('Authorization').split(' ')[1])*/req.body.email)).nModified})       
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
          res.json(await this.NoteService.trash(/*await jwt.decode(req.header('Authorization').split(' ')[1])*/req.body.email))      
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
          //req.body.email=await jwt.decode(req.header('Authorization').split(' ')[1]);                
          res.json({RecordsArchived:(await this.NoteService.archive(req.body)).nModified})      
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
          res.json(await this.NoteService.archives(/*await jwt.decode(req.header('Authorization').split(' ')[1])*/req.body.email))   
        }
        catch (error) {
        res.status(400).json({Error:`${error}`});
      }
    }
  }

export default NoteController;


