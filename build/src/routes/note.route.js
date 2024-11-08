"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_validator_1 = __importDefault(require("../validators/note.validator"));
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class NoteRoutes {
    constructor() {
        this.NoteController = new note_controller_1.default();
        this.router = express_1.default.Router();
        this.NoteValidator = new note_validator_1.default();
        this.routes = () => {
            //route to create a note
            this.router.post('/createnote', auth_middleware_1.userAuth, this.NoteValidator.uData, this.NoteController.createNote);
            //route to read a note
            this.router.get('/readnote/:id', auth_middleware_1.userAuth, this.NoteValidator.id, this.NoteController.readNote);
            //route to read all notes
            this.router.get('/readnotes', auth_middleware_1.userAuth, this.NoteController.readNotes);
            //route to update a note
            this.router.put('/updatenote', auth_middleware_1.userAuth, this.NoteValidator.data, this.NoteController.updateNote);
            //route to trash a note
            this.router.delete('/trash/:id', auth_middleware_1.userAuth, this.NoteValidator.id, this.NoteController.trash);
            //route to delete notes permanetly from trash
            this.router.delete('/deletepermanetly/:id', auth_middleware_1.userAuth, this.NoteValidator.id, this.NoteController.deletePermanetly);
            //route to archive a note 
            this.router.post('/archive/:id', auth_middleware_1.userAuth, this.NoteValidator.id, this.NoteController.archive);
            //route to view trashBin
            this.router.get('/trashBin', auth_middleware_1.userAuth, this.NoteController.trashBin);
            //route to view all archives 
            this.router.get('/archives', auth_middleware_1.userAuth, this.NoteController.archives);
        };
        this.getRoutes = () => this.router;
        this.routes();
    }
}
exports.default = NoteRoutes;
