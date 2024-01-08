import jwt from "jsonwebtoken";

const jwtSign = (payload) => {
  try {
    console.log('createing jwt', payload);
    const token = jwt.sign(payload, process.env.JWT_SIGNATURE,{expiresIn:'1d'});
    return token;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default jwtSign