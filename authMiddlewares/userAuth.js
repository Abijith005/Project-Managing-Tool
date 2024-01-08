import jwtVerify from "../Helpers/jwitVerify.js";

export async function userAuth(req, res, next) {
  try {
    console.log('user auth');
    const token = req.headers.authentication;
    console.log(token,'tokkkkk');
    const authorized = jwtVerify(token);
    if (authorized.role === "User") {
      next();
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Unauthorized" });
  }
}

export default userAuth