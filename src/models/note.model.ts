import { Schema, model } from 'mongoose';

const keepnotes =  model('keepnotes', new Schema({

  title: {type : String , required:true},
  description:{type : String, default:"Nothing here"},
  color : {type : String, default:""},
  isArchive : {type : Boolean, default:false},
  isTrash : {type : Boolean, default:false},
  createdBy : {type : String, default:""},
  email:{type:String}

}));

export default keepnotes;
