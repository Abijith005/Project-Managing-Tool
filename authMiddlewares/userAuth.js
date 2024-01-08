import jwtVerify from "../helpers/jwitVerify.js";

export async function userAuth(req, res, next) {
  try {
    const token = req.headers.authentication;
    const authorized = jwtVerify(token);
    if (authorized.role === "User") {
      next();
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Authorization Error ", error);
    res.status(500).json({ success: false, message: "Unauthorized" });
  }
}

export default userAuth;
