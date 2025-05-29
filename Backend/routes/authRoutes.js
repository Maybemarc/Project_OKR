import express from "express";
import {  loginUser, logoutUser, registerUSer } from "../controlllers/authController.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/",registerUSer)
router.post("/login",loginUser)
router.post("/logout",logoutUser)

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user)
  } catch (error) {
    console.log("Error in Checking: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router