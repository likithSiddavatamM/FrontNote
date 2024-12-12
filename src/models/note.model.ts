import { Schema, model } from 'mongoose';

const keepnotes =  model('keepnotes', new Schema({

  title: {type : String , default:""},
  description:{type : String, default:""},
  color : {type : String, default:"white"},
  isArchive : {type : Boolean, default:false},
  isTrash : {type : Boolean, default:false},
  createdBy : {type : String, default:""},
  email:{type:String}

}));

export default keepnotes;
