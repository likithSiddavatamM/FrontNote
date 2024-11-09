import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import keepnotes from '../../src/models/note.model';
import user from '../../src/models/user.model';

const mockUser = {
  firstName: 'liki',
  lastName: 'siddu',
  email: 'liki.siddu@gmail.com',
  password: 'Blackspy@$1864$'
};
let token; 
before(async () => {
await mongoose.connect(process.env.DATABASE_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
});
after(async () => {
  await keepnotes.deleteMany({});
  await user.deleteMany({});
});

describe('User Registration API', () => {
  describe('POST /api/v1/funddonotes/user/register', () => {
          it('should accept a new user', (done) => {
            request(app.getApp())
                .post('/api/v1/funddonotes/user/register')
                .send(mockUser)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(201); // Check status code
                    expect(res.body.message).to.be.equal(`User with name ${mockUser.firstName} ${mockUser.lastName} is been created successfully, you can login using ${mockUser.email}`); // Check message
                    done();
                });
             }); 
          });

      describe('POST /api/v1/funddonotes/user/register', () => {
      it('should reject a user who is present already', (done) => {
        request(app.getApp())
            .post('/api/v1/funddonotes/user/register')
            .send(mockUser)
            .end((err, res) => {
                if (err) return done(err); // Handle error if it occurs
                expect(res.status).to.equal(400); // Check status code
                expect(res.body.message).to.be.equal(`User with name is already registered through the email id`); // Check message
                done(); // Call done after assertions
            });
      });
      });

});

describe('Login',()=>{
let user ={
  email: 'john.doe@example.com',
    password: 'Blackspy@$1864$'
  };

    it('should login a new user', (done) => {
      request(app.getApp())
          .post('/api/v1/funddonotes/user/login')
          .send(user)
          .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(200); // Check status code
              expect(res.body.message).to.be.equal(`You are now loggedIn as ${mockUser.firstName} ${mockUser.lastName}`); // Check message
              token = res.body.accessToken
              done();
          });
  }); 
  it('should not login and tell to register', (done) => {
    let user1 ={
      email: 'john.doe@examplae.com',
        password: 'Blackspy@$1864$'
      };
    request(app.getApp())
    .post('/api/v1/funddonotes/user/login')
    .send(user1)
    .end((err, res) => {
      if (err) return done(err); // Hand01le error if it occurs
      expect(res.status).to.equal(400); // Check status code
      expect(res.body.message).to.be.equal(`User with email ${user1.email} doesn't exist, please go with the registration`); // Check message
      done(); // Call done after assertions
  });

  })

  it('should not login and passwrod error', (done) => {
    let user2 = {
      email: mockUser.email,
        password: 'Blackspfgy@$1864$'
      };
    request(app.getApp())
    .post('/api/v1/funddonotes/user/login') // Ensure the endpoint is correct
    .send(user2)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.status).to.equal(400); // Check status code
      expect(res.body.message).to.be.equal(`You have entered a incorrect password, try again`); // Check message
      done(); // Call done after assertions
  });

  })


})

describe('Made on notes',()=>{
let note = {
  "title":"likith",
  "description":"kwbdhbshbdhbshbds"
}
 
  describe('POST /api/v1/funddonotes/createnote with JWT', () => {
    it('should successfully create a note and return a 201 status', async () => {
  
      request(app.getApp())
        .post('/api/v1/funddonotes/usernotes/createnote')
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((e,r)=>{
          expect(r.status).to.be.equal(201)
          expect(r.body).to.have.property('title', 'Sample Title');
        })
  
      });
  });
})
