"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class UserRoutes {
    constructor() {
        this.UserController = new user_controller_1.default();
        this.router = express_1.default.Router();
        this.UserValidator = new user_validator_1.default();
        this.routes = () => {
            //route to create a new user
            this.router.post('/register', this.UserValidator.regUser, this.UserController.regUser);
            //route to login
            this.router.post('/login', this.UserValidator.logUser, this.UserController.logUser);
            //route to forgot password
            this.router.post('/forgotpassword', this.UserValidator.email, this.UserController.forgotPassword);
            //route to reset password
            this.router.post('/resetpassword', this.UserValidator.resetPassword, auth_middleware_1.userAuth, this.UserController.resetPassword);
        };
        this.getRoutes = () => this.router;
        this.routes();
    }
}
exports.default = UserRoutes;
