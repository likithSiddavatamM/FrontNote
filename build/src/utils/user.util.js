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
const nodemailer_1 = __importDefault(require("nodemailer"));
class Transporter {
    constructor() {
        this.Data = {
            from: process.env.SECRET_MAIL_ID,
            to: '',
            subject: `Use this Reset Password Token for login`,
            text: ``
        };
        this.Transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SECRET_MAIL_ID,
                pass: process.env.SECRET_MAIL_PASSWORD
            }
        });
        this.sendMail = (ForgetPasswordAccessToken, email) => __awaiter(this, void 0, void 0, function* () {
            this.Data.to = email;
            this.Data.text = `Your reset password token is '${ForgetPasswordAccessToken}'`;
            return yield this.Transporter.sendMail(this.Data);
        });
    }
}
exports.default = new Transporter();
