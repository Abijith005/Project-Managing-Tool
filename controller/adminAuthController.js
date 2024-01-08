import jwtSign from "../helpers/jwtSign.js";
import adminModel from "../models/adminModel.js";

export async function adminRegister(req, res) {
  try {
    const { email, password } = req.body;
    await adminModel.create({ email: email, password: password });
    res.status(200).json({ success: true, message: "registration successful" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (admin) {
      if (admin.password === password) {
        const payload = { id: admin._id, email: email, role: "Admin" };
        const token = jwtSign(payload);
        res.setHeader("authToken", token);

        res.status(200).json({ success: true, message: "Login successfull" });
      } else {
        res.status(200).json({ success: false, message: "Invalid password" });
      }
    } else {
      res.status(200).json({ success: false, message: "admin not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
