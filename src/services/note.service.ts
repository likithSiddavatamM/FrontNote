import User from '../models/user.model';
import keepnotes from '../models/note.model';
import { redisClient } from '../middlewares/cache.middleware';
import { Request, Response } from 'express';

class NoteService {

  //create note
  public createNote = async(reqBody:{title:string; description:string; email : string;}): Promise<any> => {
    let data  = JSON.parse(JSON.stringify(await keepnotes.create(reqBody)));
    data.createdBy = await (await User.findOne({email:reqBody.email}))._id;
    await redisClient.del(reqBody.email);
    await keepnotes.updateOne({_id:data._id},{createdBy:data.createdBy})
    return keepnotes.findOne({_id:data._id}, {email:true, title:true, description:true, createdBy:true, _id:false}) }

  //find a note
  public findNote = async(req:Request): Promise<any> => {
    let data = await keepnotes.findOne({email:req.body.email,_id:req.params.id,isArchive:false,isTrash:false},{title: true,description:true,  createdBy:true, email:true});
    if(!data) throw new Error("No such note");
    return data; }
  
  //find multiple notes
  public findNotes = async(email:string): Promise<any> => {
    let data = await keepnotes.find({email:email,isArchive:false,isTrash:false},{title: true,description:true,  createdBy:true,email:true,_id:false});
    if(data.length==0) throw new Error("No such notes available");
    await redisClient.setEx(email ,1111, JSON.stringify(data)); 
    return data }

  //update note
  public updateNote = async(req:Request): Promise<string> => {
    let data = JSON.parse(JSON.stringify(await keepnotes.findOne({email:req.body.email,_id:req.params.id,isArchive:false,isTrash:false})))
    if(!data) throw new Error("No such notes available");
    await keepnotes.updateOne({_id:data._id},{$set:{title:req.body.title||data.title, description:req.body.description||data.description}})
    await redisClient.del(req.body.email);
    return "Note Updated Successfully" }
  
  //delete note
  public trash = async(req:Request): Promise<any> => { 
    let myData = JSON.parse(JSON.stringify(await keepnotes.findOne({email:req.body.email,_id:req.params.id})))
    if(!myData) throw new Error("No such data")
    await keepnotes.updateOne({_id:myData}, {$set:{isTrash:!myData.isTrash}})
    await redisClient.del(req.body.email);
    return !myData.isTrash==true?`Deleted the Note (id:${myData._id})`:`Restored the Note from TrashBin (id:${myData._id})` }
  
  //delete notes
  public deletePermanetly = async(req:Request): Promise<any> => {
    await redisClient.del(req.body.email); 
    return await keepnotes.deleteOne({email:req.body.email,_id:req.params.id,isTrash:true})}

  //trashed notes
  public trashBin = async(email:string): Promise<any> =>
    await keepnotes.find({email:email,isTrash:true}, {title: true, description:true,  createdBy:true,email:true,_id:false})
  
  //archive note
  public archive = async(req:Request): Promise<any> => {
    let myData = JSON.parse(JSON.stringify(await keepnotes.findOne({email:req.body.email,_id:req.params.id,isTrash:false})))
    if(!myData) throw new Error("No such data")
    await keepnotes.updateOne({_id:myData}, {$set:{isArchive:!myData.isArchive}})
    await redisClient.del(req.body.email);
    return !myData.isArchive==true?"Archived":"Restored from Archives" }

  //archived note
  public archives = async(email:string): Promise<any> => 
    await keepnotes.find({email:email,isArchive:true,isTrash:false}, {title: true, description:true,  createdBy:true,email:true,_id:false})

} 

export default NoteService;