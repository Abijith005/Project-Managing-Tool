import projectModel from "../Models/projectModel.js";
import jwtDecode from "../helpers/jwtDecode.js";

export async function createProject(req, res) {
  try {
    const { projectName, description, members } = req.body;
    const adminId = jwtDecode(req.headers.authentication).id;
    await projectModel.create({
      projectName: projectName,
      description: description,
      members: members,
      createdBy: adminId,
    });
    res
      .status(200)
      .json({ success: true, message: "project created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getProjects(req, res) {
  try {
    const decodeToken = jwtDecode(req.headers.authentication);
    const adminId = decodeToken.id;
    const projects = await projectModel.find({ createdBy: adminId }).lean();
    res.status(200).json({ success: true, message: "success", projects });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function deletProject(req, res) {
  try {
    const { id } = req.params;
    await projectModel.deleteOne({ _id: id });

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateProject(req, res) {
  try {
    const { id } = req.body;
    await projectModel.updateOne({ _id: id }, { $set: { ...req.body } });
    res
      .status(200)
      .json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
