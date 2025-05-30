import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Access Denied,Unauthorised" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    req.userData = await User.findById(req.user.id);
    next();
  } catch (error) {
    console.log(`Error in verifyToken :`, error);
    return res.status(400).json({ message: "Invalid Token." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.userData.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
