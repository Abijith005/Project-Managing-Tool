import mongoose from "mongoose";

const taskShema=new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false,
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

const taskModel=mongoose.model('task',taskShema)

export default taskModel