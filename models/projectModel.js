import mongoose from "mongoose";


const projectSchema=new mongoose.Schema({
    projectName:{
        type:String,
        requied:[true,'projectName is required']
    },
    description:{
        type:String,
        requied:[true,'desc required']
    },
    members:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[],
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'admin'
    }

})

const projectModel=mongoose.model('project',projectSchema)

export default projectModel