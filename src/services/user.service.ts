import User from '../models/user.model';
import {keepnotes} from '../models/user.model';

import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class UserService {

  //create user for registration
  public newUser = async (body: IUser): Promise<any> => {
      if((await User.find({email:body.email})).length===0){
        body.password = await bcrypt.hash(body.password, 10);
        return await User.create(body);;
      }
      throw new Error(`User with name is already registered through the email id`);
  };

  //create login
  public logging = async(body: IUser): Promise<any> => {
    let UserValue = await User.find({email:body.email})
    if(UserValue.length==0)
      throw new Error(`User with email ${body.email} doesn't exist, please go with the registration`);

    let comp = await bcrypt.compare(body.password, UserValue[0].password);
     if(!comp)
      throw new Error(`You have entered a incorrect password, try again`);
    
    UserValue[0].AccessToken=jwt.sign(body.email,process.env.SECRET_KEY);
    return UserValue[0];
  }

  //create note
  public createNote = async(reqBody:any): Promise<any> => {
    let data = await keepnotes.create(reqBody);
    data.createdBy = data._id;
    await data.save();
    return keepnotes.findOne({_id:data._id}, {email:true, title:true, description:true, createdBy:true, _id:false})
     
  }

  //find a note
  public findNote = async(id:any): Promise<any> => {
    let data = await keepnotes.find({$and : [{_id:id},{isArchive:false},{isTrash:false}]},{title: true,description:true,  createdBy:true, email:true/* ,_id:false */});
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
    let data = await this.findNote(body.createdBy)
    if(body.title)
        data.title=body.title;
    if(body.description)
        data.description=body.description;
    return await data.save();
  }
  
  //delete note
  public deleteNote = async(id:any): Promise<any> => 
    await keepnotes.updateOne({_id:id}, {$set:{isTrash:true}})
  
  
  //delete notes
  public deleteNotes = async(email:any): Promise<any> => 
    await keepnotes.updateMany({email:email}, {$set:{isTrash:true}})

  //trash notes
  public trash = async(email:any): Promise<any> => 
    await keepnotes.find({$and :[{email:email},{isTrash:true}] }, {title: true, description:true,  createdBy:true,email:true,_id:false})

  //archive note
  public archive = async(id:any): Promise<any> => 
    await keepnotes.updateOne({_id:id}, {$set:{isArchive:true}})

  //archived note
  public archives = async(email:any): Promise<any> => 
    await keepnotes.find({$and :[{email:email},{isArchive:true}] }, {title: true, description:true,  createdBy:true,email:true,_id:false})
  
} 

export default UserService;


/*   //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  }; */

  

  /*//update a user
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };*/

 /*  //get a single user
  public getUser = async (_id: string): Promise<IUser> => {
    const data = await User.findById(_id);
    return data;
  }; */