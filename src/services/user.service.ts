import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

class UserService {

/*   //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  }; */

  //create user for registration
  public newUser = async (body: IUser): Promise<any> => {
      let email = body.email;
      let UserValue = await User.find({email:body.email})
      if(UserValue.length===0){
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
      throw new Error(`You have entered a incorrect paassword, try again`);
    
    return UserValue[0];
  }
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
} 

export default UserService;
