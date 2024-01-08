import jwtSign from "../helpers/jwtSign.js";
import userModel from "../models/userModel.js";

export async function userRegister(req, res) {
  try {
    const { email, password } = req.body;
    await userModel.create({ email: email, password: password });
    res
      .status(200)
      .json({ success: true, message: "user registration success" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        const userToken = jwtSign({ id: user.id, email: email, role: "User" });
        res.setHeader("userToken", userToken);
        res
          .status(200)
          .json({ success: true, message: "user login successfull" });
      } else {
        res.status(200).json({ success: false, message: "incorrect password" });
      }
    } else {
      res.status(200).json({ success: false, message: "user not found" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
