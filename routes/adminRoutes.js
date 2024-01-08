import express from "express";
import { createProject, deletProject, getProjects, updateProject } from "../controller/adminController.js";

const router = express.Router();


router.post('/createProject',createProject)

router.get('/getProjects',getProjects)

router.delete('/deleteProject/:id',deletProject)

router.put('/updateProject',updateProject)

export default router;
