/* eslint-disable @typescript-eslint/no-explicit-any */
import NoteService from '../services/note.service';
import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import NoteValidator from '../validators/note.validator'; 

class NoteController {
  public a = new NoteValidator();
  public NoteService = new NoteService();

    //Create a note
    public createNote = async (req: Request,res: Response): Promise<any> => {
        try {
        res.status(HttpStatus.CREATED).json({code:HttpStatus.CREATED,data:await this.NoteService.createNote(req.body)}); }
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    };

    //Read/Fetch a note
    public readNote = async (req: Request,res: Response): Promise<any> => {
        try{     
          res.status(HttpStatus.OK).json({code:HttpStatus.OK,data:await this.NoteService.findNote(req)})}
        catch (error) {
          res.status(400).json({Error:error.message}); }
    }
    
    //Read/Fetch all notes
    public readNotes = async (req: Request,res: Response): Promise<any> => {
        try{     
          res.status(HttpStatus.OK).json({code:HttpStatus.OK,data:await this.NoteService.findNotes(req.body.email)})} 
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    }

    //Update a note
    public updateNote = async (req: Request,res: Response): Promise<any> => {
        try{
          res.status(HttpStatus.OK).json({code:HttpStatus.OK,status : await this.NoteService.updateNote(req)}) }
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    }

    //move note to trash
    public trash = async (req: Request,res: Response): Promise<any> => {
        try{ 
          res.status(HttpStatus.OK).json({code:HttpStatus.OK,Status:(await this.NoteService.trash(req))}) }
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    }

    //Move all notes to trash
    public deletePermanetly = async (req: Request,res: Response): Promise<any> => {
        try{     
          res.status(HttpStatus.OK).json({code:HttpStatus.OK, RecordsDeleted:(await this.NoteService.deletePermanetly(req)).deletedCount}) }
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    }

    //View trash
    public trashBin = async (req: Request,res: Response): Promise<any> => {
        try{     
          res.status(HttpStatus.OK).json({code:HttpStatus.OK,data:await this.NoteService.trashBin(req.body.email)}) }
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    }

    //Archive note
    public archive = async (req: Request,res: Response): Promise<any> => {
        try{     
          res.status(HttpStatus.OK).json({code:HttpStatus.OK,Status:(await this.NoteService.archive(req))}) }
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    }

    //View all archives
    public archives = async (req: Request,res: Response): Promise<any> => {
        try{     
          res.status(HttpStatus.OK).json({code:HttpStatus.OK,data:await this.NoteService.archives(req.body.email)}) }
        catch (error) {
          {res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error.message}`});}
        }
    }
  }

export default NoteController;


