"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const keepnotes = (0, mongoose_1.model)('keepnotes', new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "Nothing here" },
    color: { type: String, default: "" },
    isArchive: { type: Boolean, default: false },
    isTrash: { type: Boolean, default: false },
    createdBy: { type: String, default: "" },
    email: { type: String }
}));
exports.default = keepnotes;
