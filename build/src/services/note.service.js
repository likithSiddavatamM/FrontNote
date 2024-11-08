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
const note_model_1 = __importDefault(require("../models/note.model"));
class NoteService {
    constructor() {
        //create note
        this.createNote = (reqBody) => __awaiter(this, void 0, void 0, function* () {
            let data = JSON.parse(JSON.stringify(yield note_model_1.default.create(reqBody)));
            data.createdBy = yield (yield user_model_1.default.findOne({ email: reqBody.email }))._id;
            yield data.save();
            return note_model_1.default.findOne({ _id: data._id }, { email: true, title: true, description: true, createdBy: true, _id: false });
        });
        //find a note
        this.findNote = (req) => __awaiter(this, void 0, void 0, function* () {
            let data = yield note_model_1.default.find({ $and: [{ email: req.body.email }, { _id: req.params.id }, { isArchive: false }, { isTrash: false }] }, { title: true, description: true, createdBy: true, email: true /* ,_id:false */ });
            if (data.length == 0)
                throw new Error("No such note");
            return data[0];
        });
        //find multiple notes
        this.findNotes = (email) => __awaiter(this, void 0, void 0, function* () {
            let data = yield note_model_1.default.find({ $and: [{ email: email }, { isArchive: false }, { isTrash: false }] }, { title: true, description: true, createdBy: true, email: true, _id: false });
            if (data.length == 0)
                throw new Error("No such notes available");
            return data;
        });
        //update note
        this.updateNote = (req) => __awaiter(this, void 0, void 0, function* () {
            let data = JSON.parse(JSON.stringify(yield note_model_1.default.findOne({ $and: [{ email: req.body.email }, { _id: req.body.id }, { isArchive: false }, { isTrash: false }] })));
            if (req.body.title)
                data.title = req.body.title;
            if (req.body.description)
                data.description = req.body.description;
            return yield data.save();
        });
        //delete note
        this.trash = (req) => __awaiter(this, void 0, void 0, function* () {
            let myData = JSON.parse(JSON.stringify(yield note_model_1.default.findOne({ $and: [{ email: req.body.email }, { _id: req.params.id }] })));
            if (!myData)
                throw new Error("No such data");
            myData.isTrash = !myData.isTrash;
            let data = yield myData.save();
            return data.isTrash == true ? `Deleted the Note (id:${data._id})` : `Restored the Note from TrashBin (id:${data._id})`;
        });
        //delete notes
        this.deletePermanetly = (req) => __awaiter(this, void 0, void 0, function* () { return yield note_model_1.default.deleteOne({ $and: [{ email: req.body.email }, { _id: req.params.id }, { isTrash: true }] }); });
        //trashed notes
        this.trashBin = (email) => __awaiter(this, void 0, void 0, function* () { return yield note_model_1.default.find({ $and: [{ email: email }, { isTrash: true }] }, { title: true, description: true, createdBy: true, email: true, _id: false }); });
        //archive note
        this.archive = (req) => __awaiter(this, void 0, void 0, function* () {
            let myData = JSON.parse(JSON.stringify(yield note_model_1.default.findOne({ $and: [{ email: req.body.email }, { _id: req.params.id }, { isTrash: false }] })));
            if (!myData)
                throw new Error("No such data");
            myData.isArchive = !myData.isArchive;
            let data = yield myData.save();
            return data.isArchive == true ? "Archived" : "Restored from Archives";
        });
        //archived note
        this.archives = (email) => __awaiter(this, void 0, void 0, function* () { return yield note_model_1.default.find({ $and: [{ email: email }, { isArchive: true }, { isTrash: false }] }, { title: true, description: true, createdBy: true, email: true, _id: false }); });
    }
}
exports.default = NoteService;
