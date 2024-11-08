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
const user_model_1 = __importDefault(require("../models/user.model"));
const user_util_1 = __importDefault(require("../utils/user.util"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        //create user for registration
        this.newUser = (body) => __awaiter(this, void 0, void 0, function* () {
            if ((yield user_model_1.default.find({ email: body.email })).length === 0) {
                body.password = yield bcrypt_1.default.hash(body.password, 10);
                return yield user_model_1.default.create(body);
            }
            throw new Error(`User with name is already registered through the email id`);
        });
        //create login
        this.logging = (body) => __awaiter(this, void 0, void 0, function* () {
            let UserValue = yield user_model_1.default.find({ email: body.email });
            if (UserValue.length == 0)
                throw new Error(`User with email ${body.email} doesn't exist, please go with the registration`);
            let comp = yield bcrypt_1.default.compare(body.password, UserValue[0].password);
            if (!comp)
                throw new Error(`You have entered a incorrect password, try again`);
            UserValue[0].AccessToken = jsonwebtoken_1.default.sign(body.email, process.env.SECRET_KEY);
            return UserValue[0];
        });
        //forgot password
        this.forgotPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            let data = yield user_model_1.default.findOne({ email: email });
            if (!data)
                throw new Error(`User with email ${email} doesn't exist, please go with the registration`);
            return yield user_util_1.default.sendMail(yield jsonwebtoken_1.default.sign(email, process.env.FORGOTPASSWORD_SECRET_KEY), email);
        });
        //reset password
        this.resetPassword = (body) => __awaiter(this, void 0, void 0, function* () {
            if (!body.fEmail)
                throw new Error("Invalid Token");
            yield user_model_1.default.updateOne({ email: body.fEmail }, { $set: { password: (yield bcrypt_1.default.hash(body.password, 9)) } });
        });
    }
}
exports.default = UserService;
