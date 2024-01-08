import express from 'express'
import { createTask, removeTask, updateTask, viewAllOpenTasks } from '../controller/userController.js'

const router=express.Router()

router.post('/createTask',createTask)

router.get('/viewAlltasks',viewAllOpenTasks)

router.patch('/updateTask',updateTask)

router.delete('/removeTask/:taskId',removeTask)


export default router