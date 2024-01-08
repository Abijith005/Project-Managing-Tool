import express from 'express'
import { AdminLogin, adminRegister } from '../controller/adminAuthController.js';

const router=express.Router()


router.post("/register", adminRegister);

router.post('/login',AdminLogin);

export default router