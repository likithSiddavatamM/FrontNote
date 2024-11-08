/* import { expect } from 'chai';
import UserService from '../../src/services/user.service';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

describe('User', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Get Users', () => {
    it('should return empty array', async () => {
      let mockuser:{email:"likith.isekit2020@gmail.com",password:"Blackspy@1864."}

      const result = await new UserService().logging(mockuser);
      expect(result).to.be.an('array');
    });
  });
});
 */ 
