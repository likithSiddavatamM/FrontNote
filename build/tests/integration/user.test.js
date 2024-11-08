"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../../src/models/user.model"));
const index_1 = __importDefault(require("e:/Project1/FundDoNotes/src/index"));
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
// const request = require('supertest'); // Import supertest
// const { expect } = require('chai');
// const app = require('../path/to/your/app'); // Ensure correct path to your app
// const mongoose = require('mongoose');
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the database connection is established
    if (mongoose_1.default.connection.readyState === 0) {
        yield mongoose_1.default.connect(process.env.DATABASE_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    // Clear collections in the database
    yield clearCollections();
}));
// Function to clear all collections in the MongoDB database
const clearCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = Object.keys(mongoose_1.default.connection.collections);
    for (const collection of collections) {
        yield mongoose_1.default.connection.collections[collection].deleteMany({});
    }
});
describe('User Registration API', () => {
    it('should register a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/v1/funddonotes/register')
            .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'StrongPassword1!'
        });
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.body).to.have.property('message');
        (0, chai_1.expect)(response.body.message).to.include('User with name John Doe is been created successfully');
    }));
    it('should return validation error for missing first name', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/v1/funddonotes/register')
            .send({
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'StrongPassword1!'
        });
        (0, chai_1.expect)(response.status).to.equal(400);
        (0, chai_1.expect)(response.body).to.have.property('message').that.includes('firstName is required');
    }));
    it('should return validation error for invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/v1/funddonotes/register')
            .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@invalid',
            password: 'StrongPassword1!'
        });
        (0, chai_1.expect)(response.status).to.equal(400);
        (0, chai_1.expect)(response.body).to.have.property('message').that.includes('Email must be a valid format ending with .com!');
    }));
    it('should return error for existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a user directly in the database to simulate an existing user
        yield user_model_1.default.create({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'StrongPassword1!'
        });
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/v1/funddonotes/register')
            .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'StrongPassword1!'
        });
        (0, chai_1.expect)(response.status).to.equal(400);
        (0, chai_1.expect)(response.body).to.have.property('message').that.includes('User with name is already registered through the email id');
    }));
    it('should return validation error for short password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/v1/funddonotes/register')
            .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'short'
        });
        (0, chai_1.expect)(response.status).to.equal(400);
        (0, chai_1.expect)(response.body).to.have.property('message').that.includes('Password must be at least 10 characters long and contain at least one special character!');
    }));
});
