import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,['email is required']]
    },
    password:{
        type:String,
        required:[true,['password required']]
    }
})

const adminModel=mongoose.model('admin',adminSchema)
export default adminModel