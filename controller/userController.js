import projectModel from "../Models/projectModel.js";
import jwt from "jsonwebtoken";
import taskModel from "../Models/taskModel.js";

export async function newfn(req, res) {
  try {
    console.log(a);
    res.status(200).json({ reaches: true });
  } catch (error) {
    res.status(500).json({ reaches: false });
  }
}

export async function createTask(req, res) {
  try {
    const user = jwt.decode(req.headers.authentication);
    const { taskName, projectId } = req.body;
    console.log(projectId);
    const project = await projectModel.findOne({ _id: projectId });
    console.log(project, user.email);
    if (project.members.includes(user.email)) {
      await taskModel.create({ taskName: taskName, createdBy: user.id });
      res
        .status(200)
        .json({ success: true, message: "task created successfully" });
    } else {
      res.status(401).json({ success: false, message: "unauthorized" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}

export async function updateTask(req, res) {
  try {
    const { id, status } = req.body;
    await taskModel.updateOne({ _id: id }, { $set: { completed: status } });

    res.status(200).json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}
