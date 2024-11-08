"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
class UserValidator {
    constructor() {
        this.regUser = (req, res, next) => {
            const schema = joi_1.default.object({
                firstName: joi_1.default.string()
                    .min(2) // Minimum of 2 characters
                    .required(),
                lastName: joi_1.default.string()
                    .min(2) // Minimum of 2 characters
                    .required(),
                email: joi_1.default.string()
                    .email({ tlds: { allow: false } }) // Allow any valid email format
                    .required()
                    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/) // Valid email format
                    .message('Email must be a valid format ending with .com!'),
                password: joi_1.default.string()
                    .min(10) // Minimum of 10 characters
                    .required()
                    .pattern(/^(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{10,}$/) // Password with at least one special character
                    .message('Password must be at least 10 characters long and contain at least one special character!')
            });
            const { error } = schema.validate(req.body);
            if (error) {
                next(error);
            }
            next();
        };
        this.logUser = (req, res, next) => {
            const schema = joi_1.default.object({
                email: joi_1.default.string()
                    .email({ tlds: { allow: false } }) // Allow any valid email format
                    .required()
                    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/) // Valid email format
                    .message('Email must be a valid format ending with .com!'),
                password: joi_1.default.string()
                    .min(10) // Minimum of 10 characters
                    .required()
                    .pattern(/^(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{10,}$/) // Password with at least one special character
                    .message('Password must be at least 10 characters long and contain at least one special character!')
            });
            const { error } = schema.validate(req.body);
            if (error)
                res.status(400).json({ Error: error.message });
            else
                next();
        };
        this.id = (req, res, next) => {
            const schema = joi_1.default.object({
                id: joi_1.default.string().required()
            });
            const { error } = schema.validate(req.body);
            if (error)
                res.status(400).json({ Error: error.message });
            else
                next();
        };
        this.email = (req, res, next) => {
            const schema = joi_1.default.object({
                email: joi_1.default.string().required().email()
            });
            const { error } = schema.validate(req.body);
            if (error)
                res.status(400).json({ Error: error.message });
            else
                next();
        };
        this.data = (req, res, next) => {
            const schema = joi_1.default.object({
                id: joi_1.default.string().required(),
                title: joi_1.default.string(),
                description: joi_1.default.string()
            });
            const { error } = schema.validate(req.body);
            if (error)
                res.status(400).json({ Error: error.message });
            else
                next();
        };
        this.resetPassword = (req, res, next) => {
            const schema = joi_1.default.object({
                // accesstoken : Joi.string().required(),
                password: joi_1.default.string()
                    .min(10)
                    .required()
                    .pattern(/^(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{10,}$/)
                    .message('Password must be at least 10 characters long and contain at least one special character!')
            });
            const { error } = schema.validate(req.body);
            if (error)
                res.status(400).json({ Error: error.message });
            else
                next();
        };
    }
}
exports.default = UserValidator;
