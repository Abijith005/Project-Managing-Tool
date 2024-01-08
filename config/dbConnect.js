import mongoose from 'mongoose'

function dbConnect(){

    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('db connected');
    }).catch((err)=>{
    console.log('db connection error '+err);
    })
}


export default dbConnect