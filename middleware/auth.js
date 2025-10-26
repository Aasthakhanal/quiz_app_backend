import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const JWT_SECRET = "jwt_secret";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized , token missing",
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    //verify token
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');

    if(!user){
         return res.status(401).json({
           success: false,
           message: "user not found",
         });
    }
    req.user = user;
    next();

  } catch (error) {
    console.log('JWT verification failed!!, error')
     return res.status(500).json({
       success: false,
       message: "token invalid or expired!!!",
     });
  }
}
