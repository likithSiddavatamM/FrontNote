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
const note_service_1 = __importDefault(require("../services/note.service"));
class NoteController {
    constructor() {
        this.NoteService = new note_service_1.default();
        //Create a note
        this.createNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield this.NoteService.createNote(req.body));
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
        //Read/Fetch a note
        this.readNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield this.NoteService.findNote(req));
            }
            catch (error) {
                res.status(400).json({ Error: error.message });
            }
        });
        //Read/Fetch all notes
        this.readNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield this.NoteService.findNotes(req.body.email));
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
        //Update a note
        this.updateNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield this.NoteService.updateNote(req));
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
        //move note to trash
        this.trash = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({ Status: (yield this.NoteService.trash(req)) });
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
        //Move all notes to trash
        this.deletePermanetly = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({ RecordsDeleted: (yield this.NoteService.deletePermanetly(req)).deletedCount });
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
        //View trash
        this.trashBin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield this.NoteService.trashBin(req.body.email));
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
        //Archive note
        this.archive = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({ Status: (yield this.NoteService.archive(req)) });
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
        //View all archives
        this.archives = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield this.NoteService.archives(req.body.email));
            }
            catch (error) {
                res.status(400).json({ Error: `${error}` });
            }
        });
    }
}
exports.default = NoteController;
