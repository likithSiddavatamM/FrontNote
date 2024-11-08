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
    ):Promise<any>=>{
        try {
        res.status(201).json(await this.NoteService.createNote(req.body)); }
        catch (error) {
          res.status(400).json({Error:`${error.message}`}); }
    };

    //Read/Fetch a note
    public readNote = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.NoteService.findNote(req))}
        catch (error) {
          res.status(400).json({Error:error.message}); }
    }
    
    //Read/Fetch all notes
    public readNotes = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.NoteService.findNotes(req.body.email))} 
        catch (error) {
          res.status(400).json({Error:`${error}`});}
    }

    //Update a note
    public updateNote = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{
          res.json({status : await this.NoteService.updateNote(req)}) }
        catch (error) {
          res.status(400).json({Error:`${error}`}); }
    }

    //move note to trash
    public trash = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{ 
          res.json({Status:(await this.NoteService.trash(req))}) }
        catch (error) {
          res.status(400).json({Error:`${error}`}); }
    }

    //Move all notes to trash
    public deletePermanetly = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json({RecordsDeleted:(await this.NoteService.deletePermanetly(req)).deletedCount}) }
        catch (error) {
        res.status(400).json({Error:`${error.message}`}); }
    }

    //View trash
    public trashBin = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.NoteService.trashBin(req.body.email)) }
        catch (error) {
          res.status(400).json({Error:`${error}`}); }
    }

    //Archive note
    public archive = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json({Status:(await this.NoteService.archive(req))}) }
        catch (error) {
          res.status(400).json({Error:`${error}`}); }
    }

    //View all archives
    public archives = async (
      req: Request,
      res: Response,
      next: NextFunction
    ):Promise<any> =>{
        try{     
          res.json(await this.NoteService.archives(req.body.email)) }
        catch (error) {
          res.status(400).json({Error:`${error}`}); }
    }
  }

export default NoteController;


