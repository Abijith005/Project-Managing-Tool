import express from 'express'
import { createTask, newfn, updateTask } from '../controller/userController.js'

const router=express.Router()

router.post('/createTask',createTask)

router.patch('/updateTask',updateTask)

export default router