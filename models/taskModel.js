import mongoose from "mongoose";

const taskShema=new mongoose.Schema({

    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'project id required']
    },

    taskName:{
        type:String,
        required:[true,'task name required']
    },
    completed:{
        type:Boolean,
        default:false,
        required:[true, 'status required']
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true, 'created by required']
    }
})

const taskModel=mongoose.model('task',taskShema)

export default taskModel