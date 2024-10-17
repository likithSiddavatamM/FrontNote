import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

class UserService {

/*   //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  }; */

  //create user for registration
  public newUser = async (body: IUser): Promise<any> => {
      let email = body.email;
      let UserValue = await User.find({email:email})
      if(UserValue.length===0){
        const data = await User.create(body);
        return data;
      }
      throw new Error(`User with name is already registered through the email id`);
  };

   //create login
  public logging = async(body: IUser): Promise<any> => {
    let UserValue = await User.find({email:body.email})
    if(UserValue.length==0)
        return "RegErr"
    else if(body.password!==UserValue[0].password)
      return "PassErr"
    else
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
