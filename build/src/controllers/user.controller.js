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
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.UserService = new user_service_1.default();
        //Register a user
        this.regUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.newUser(req.body);
                if (data) {
                    res.status(200).json({
                        // code: HttpStatus.CREATED,
                        message: `User with name ${data.firstName} ${data.lastName} is been created successfully, you can login using ${data.email}`
                    });
                }
            }
            catch (error) {
                {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        code: http_status_codes_1.default.BAD_REQUEST,
                        message: `${error}`
                    });
                }
            }
        });
        //LogIn user
        this.logUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.logging(req.body);
                if (typeof (data) == "object") {
                    res.status(200).json({
                        code: http_status_codes_1.default.CREATED,
                        message: `You are now loggedIn as ${data.firstName} ${data.lastName}`,
                        acessToken: `${data.AccessToken}`
                    });
                }
            }
            catch (error) {
                {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        code: http_status_codes_1.default.BAD_REQUEST,
                        message: `${error}`
                    });
                }
            }
        });
        this.forgotPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.UserService.forgotPassword(req.body.email);
                res.json({ code: data.response,
                    message: `Reset link sent successfully to : ${data.envelope.to}` });
            }
            catch (error) {
                res.json({ message: error.message });
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.UserService.resetPassword(req.body);
                res.json({ data: `Password updated successfully for ${req.body.fEmail}, you can login through your updated password` });
            }
            catch (error) {
                res.json({ message: error.message });
            }
        });
    }
}
exports.default = UserController;
