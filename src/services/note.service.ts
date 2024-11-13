import keepnotes from '../models/note.model';
import { redisClient } from '../middlewares/cache.middleware';
import { Request } from 'express';

class NoteService {

  //create note
  public createNote = async(reqBody:{title:string; description:string; email : string; createdBy : string}): Promise<object> => {
    let data_id  = JSON.parse(JSON.stringify(await keepnotes.create(reqBody)))._id;
    await redisClient.del(reqBody.createdBy);
    return keepnotes.findOne({_id:data_id}, {email:true, title:true, description:true, createdBy:true, _id:false}) }

  //find a note
  public findNote = async(req:Request): Promise<Object> => {
    let data = await keepnotes.findOne({createdBy:req.body.createdBy,_id:req.params.id,isArchive:false,isTrash:false},{title: true,description:true,  createdBy:true, email:true});
    if(!data) throw new Error("No such note");
    return data; }
  
  //find multiple notes
  public findNotes = async(createdBy:string): Promise<Object> => {
    let data = await keepnotes.find({createdBy:createdBy,isArchive:false,isTrash:false},{title: true,description:true,  createdBy:true,email:true,_id:false});
    if(data.length==0) throw new Error("No such notes available");
    await redisClient.setEx(createdBy ,1111, JSON.stringify(data)); 
    return data }

  //update note
  public updateNote = async(req:Request): Promise<string> => {
    let data = JSON.parse(JSON.stringify(await keepnotes.findOne({createdBy:req.body.createdBy,_id:req.params.id,isArchive:false,isTrash:false})))
    if(!data) throw new Error("No such notes available");
    await keepnotes.updateOne({_id:data._id},{$set:{title:req.body.title||data.title, description:req.body.description||data.description}})
    await redisClient.del(req.body.createdBy);
    return "Note Updated Successfully" }
  
  //delete note
  public trash = async(req:Request): Promise<string> => { 
    let myData = JSON.parse(JSON.stringify(await keepnotes.findOne({createdBy:req.body.createdBy,_id:req.params.id})))
    if(!myData) throw new Error("No such data")
    await keepnotes.updateOne({_id:myData}, {$set:{isTrash:!myData.isTrash}})
    await redisClient.del(req.body.createdBy);
    return !myData.isTrash==true?`Deleted the Note (id:${myData._id})`:`Restored the Note from TrashBin (id:${myData._id})` }
  
  //delete notes
  public deletePermanetly = async(req:Request): Promise<any> => {
    await redisClient.del(req.body.createdBy); 
    return await keepnotes.deleteOne({createdBy:req.body.createdBy,_id:req.params.id,isTrash:true})}

  //trashed notes
  public trashBin = async(createdBy:string): Promise<Object[]> =>
    await keepnotes.find({createdBy:createdBy, isTrash:true}, {title: true, description:true,  createdBy:true, email:true, _id:false})
  
  //archive note
  public archive = async(req:Request): Promise<string> => {
    let myData = JSON.parse(JSON.stringify(await keepnotes.findOne({createdBy:req.body.createdBy,_id:req.params.id,isTrash:false})))
    if(!myData) throw new Error("No such data")
    await keepnotes.updateOne({_id:myData}, {$set:{isArchive:!myData.isArchive}})
    await redisClient.del(req.body.createdBy);
    return !myData.isArchive==true?"Archived":"Restored from Archives" }

  //archived note
  public archives = async(createdBy:string): Promise<object> => 
    await keepnotes.find({createdBy:createdBy,isArchive:true,isTrash:false}, {title: true, description:true,  createdBy:true,email:true,_id:false})

} 

export default NoteService;