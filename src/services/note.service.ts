import User from '../models/user.model';
import keepnotes from '../models/note.model';
import { Mongoose } from 'mongoose';
class NoteService {
  //create note
  public createNote = async(reqBody:any): Promise<any> => {
    let data = await keepnotes.create(reqBody);
    data.createdBy = await (await User.findOne({email:reqBody.email}))._id;
    await data.save();
    return keepnotes.findOne({_id:data._id}, {email:true, title:true, description:true, createdBy:true, _id:false})
  }

  //find a note
  public findNote = async(body:any): Promise<any> => {
    let data = await keepnotes.find({$and : [{email:body.email},{_id:body.id},{isArchive:false},{isTrash:false}]},{title: true,description:true,  createdBy:true, email:true/* ,_id:false */});
    if(data.length==0)
       throw new Error("No such note");
    return data[0];
  }
  
  //find multiple notes
  public findNotes = async(email:any): Promise<any> => {
    let data = await keepnotes.find({$and : [{email:email},{isArchive:false},{isTrash:false}]},{title: true,description:true,  createdBy:true,email:true,_id:false});
    if(data.length==0)
       throw new Error("No such notes available");
    return data
  }

  //update note
  public updateNote = async(body:any): Promise<any> => {
    let data = await this.findNote(body)
    if(body.title)
        data.title=body.title;
    if(body.description)
        data.description=body.description;
    return await data.save();
  }
  
  //delete note
  public trash = async(body:any): Promise<any> => 
  { 
    let myData = await keepnotes.findOne({$and :[{email:body.email},{_id:body.id}]})
    if(!myData)
      throw new Error("No such data")
    myData.isTrash=!myData.isTrash
    let data = await myData.save();
    return data.isTrash==true?`Deleted the Note (id:${data._id})`:`Restored the Note from TrashBin (id:${data._id})`
    
  }
  //delete notes
  public deletePermanetly = async(body:any): Promise<any> => 
    await keepnotes.deleteOne({$and:[{email:body.email},{_id:body.id},{isTrash:true}]})

  //trashed notes
  public trashBin = async(email:any): Promise<any> => 
    await keepnotes.find({$and :[{email:email},{isTrash:true}] }, {title: true, description:true,  createdBy:true,email:true,_id:false})
  
  //archive note
  public archive = async(body:any): Promise<any> => 
  {
    let myData = await keepnotes.findOne({$and :[{email:body.email},{_id:body.id},{isTrash:false}]})
    if(!myData)
      throw new Error("No such data")
    myData.isArchive=!myData.isArchive
    let data = await myData.save();
    return data.isArchive==true?"Archived":"Restored from Archives"
   
}
  //archived note
  public archives = async(email:any): Promise<any> => 
    await keepnotes.find({$and :[{email:email},{isArchive:true},{isTrash:false}] }, {title: true, description:true,  createdBy:true,email:true,_id:false})
} 

export default NoteService;