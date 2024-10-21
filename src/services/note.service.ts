import User from '../models/user.model';
import keepnotes from '../models/note.model';

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
  public deleteNote = async(body:any): Promise<any> => 
    await keepnotes.updateOne({$and:[{email:body.email},{_id:body.id},{isTrash:false}] }, {$set:{isTrash:true}})
  
  //delete notes
  public deleteNotes = async(email:any): Promise<any> => 
    await keepnotes.updateMany({$and:[{email:email},{isTrash:false},{isArchive:false}] }, {$set:{isTrash:true}})

  //trashed notes
  public trash = async(email:any): Promise<any> => 
    await keepnotes.find({$and :[{email:email},{isTrash:true}] }, {title: true, description:true,  createdBy:true,email:true,_id:false})
  
  //archive note
  public archive = async(body:any): Promise<any> => 
    await keepnotes.updateOne({$and :[{email:body.email},{_id:body.id},{isArchive:false}] }, {$set:{isArchive:true}})

  //archived note
  public archives = async(email:any): Promise<any> => 
    await keepnotes.find({$and :[{email:email},{isArchive:true}] }, {title: true, description:true,  createdBy:true,email:true,_id:false})
} 

export default NoteService;