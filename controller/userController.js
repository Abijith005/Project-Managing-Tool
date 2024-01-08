import projectModel from "../models/projectModel.js";
import jwt from "jsonwebtoken";
import taskModel from "../models/taskModel.js";
import jwtDecode from "../helpers/jwtDecode.js";
import mongoose from "mongoose";

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
    console.log(project, user.id);
    if (project.members.includes(user.id)) {
      await taskModel.create({
        taskName: taskName,
        createdBy: user.id,
        projectId: projectId,
      });
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

export async function viewAllOpenTasks(req, res) {
  try {
    const user = jwtDecode(req.headers.authentication);

    const pipeline = [
      {
        $match: {
          members: new mongoose.Types.ObjectId(user.id),
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "projectId",
          as: "tasks",
        },
      },
      {
        $unwind: "$tasks",
      },
      {
        $project: {
          _id: "$tasks._id",
          projectId: "$tasks.projectId",
          taskName: "$tasks.taskName",
          completed: "$tasks.completed",
          createdBy: "$tasks.createdBy",
          __v: "$tasks.__v",
        },
      },
    ];

    const tasks = await projectModel.aggregate(pipeline);
    res.status(200).json({ success: true, message: "success", tasks });
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

export async function removeTask(req, res) {
  try {
    const userId = jwtDecode(req.headers.authentication).id;
    const { taskId } = req.params;
    const task = await taskModel.findOne({ _id: taskId });
    console.log(task, userId);

    if (task.createdBy.toString() === userId) {
      await taskModel.deleteOne({ _id: taskId });
      res.status(200).json({ success: true, message: "task removed" });
    } else {
      res.status(401).json({ success: false, message: "unauthorized" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}
