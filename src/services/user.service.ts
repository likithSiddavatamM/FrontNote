import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

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
    if(!(await bcrypt.compare(body.password, UserValue[0].password)))
      throw new Error(`You have entered a incorrect paassword, try again`);
    return UserValue[0];
  }
  
} 

export default UserService;
