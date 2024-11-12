import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import keepnotes from '../../src/models/note.model';
import user from '../../src/models/user.model';

const mockUser = {
  firstName: 'liki',
  lastName: 'siddu',
  email: 'likisis@gmail.com',
  password: 'Blackspy111111'
};
let token;

before(async () => {
  await mongoose.connect(process.env.DATABASE_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
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
          expect(res.body.message).to.be.equal(`User with name ${mockUser.firstName} ${mockUser.lastName} is been created successfully, you can login using ${mockUser.email}`);
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
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message).to.be.equal(`User with name is already registered through the email id`);
          done();
        });
    });
  });
});

describe('Login', () => {
  let user = {
    email: mockUser.email,
    password: mockUser.password
  };

  it('should login a new user', (done) => {
    request(app.getApp())
      .post('/api/v1/funddonotes/user/login')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal(`You are now loggedIn as ${mockUser.firstName} ${mockUser.lastName}`);
        token = res.body.accessToken;
        done();
      });
  });

  it('should not login and tell to register', (done) => {
    let user1 = {
      email: 'likiisid@gmail.com',
      password: 'Blackspy111111'
    };
    request(app.getApp())
      .post('/api/v1/funddonotes/user/login')
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.be.equal(`User with email ${user1.email} doesn't exist, please go with the registration`);
        done();
      });
  });

  it('should not login and passwrod error', (done) => {
    let user2 = {
      email: mockUser.email,
      password: 'Blackspfgy@$100864$'
    };
    request(app.getApp())
      .post('/api/v1/funddonotes/user/login')
      .send(user2)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.be.equal(`You have entered a incorrect password, try again`);
        done();
      });
  });
});

describe('Made on notes', () => {
  let note = {
    "title": "likith",
    "description": "kwbdhbshbdhbshbds"
  };

  describe('POST /api/v1/funddonotes/createnote with JWT', () => {
    it('should successfully create a note and return a 201 status', (done) => {
      request(app.getApp())
        .post('/api/v1/funddonotes/usernotes/createnote')
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((e, r) => {
          expect(r.status).to.be.equal(201);
          expect(r.body.data).to.have.property('title');
          done();
        });
    });

    it('should return 400 for invalid note ID', (done) => {
      request(app.getApp())
        .get(`/api/v1/funddonotes/usernotes/readnote/invalidId`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should successfully read notes with valid JWT and cache result', (done) => {
      request(app.getApp())
        .get('/api/v1/funddonotes/usernotes/readnotes')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('array').that.is.not.empty;
          expect(res.body.data[0]).to.have.property('title', note.title);
          expect(res.body.data[0]).to.have.property('description', note.description);
          done();
        });
    });
  });
});
