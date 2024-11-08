"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
class NoteValidator {
    constructor() {
        this.id = (req, res, next) => {
            const schema = joi_1.default.object({
                id: joi_1.default.string().required(),
                // email : Joi.string()
            });
            const { error } = schema.validate(req.params);
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
                description: joi_1.default.string(),
                email: joi_1.default.string()
            });
            const { error } = schema.validate(req.body);
            if (error)
                res.status(400).json({ Error: error.message });
            else
                next();
        };
        this.uData = (req, res, next) => {
            const schema = joi_1.default.object({
                title: joi_1.default.string(),
                description: joi_1.default.string(),
                email: joi_1.default.string()
            });
            const { error } = schema.validate(req.body);
            if (error)
                res.status(400).json({ Error: error.message });
            else
                next();
        };
    }
}
exports.default = NoteValidator;
