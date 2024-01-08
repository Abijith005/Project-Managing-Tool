import express from 'express'
import morgan from 'morgan'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'
import adminAuthRouter from './routes/adminAuthRoutes.js'
import dbConnect from './config/dbConnect.js'
import AdminAuth from './authMiddlewares/adminAuth.js'
import userAuthRouter from './routes/userAuthRoutes.js'
import userAuth from './authMiddlewares/userAuth.js'

const app=express()


app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const port=process.env.PORT||8000

app.listen(port,()=>{
    console.log('app listening to the port '+ port);
})
dbConnect()

app.use('/admin/auth',adminAuthRouter)
app.use('/admin',AdminAuth,adminRouter)
app.use('/auth',userAuthRouter)
app.use('/user',userAuth,userRouter)