import express from "express";
import {  loginUser, logoutUser, registerUSer } from "../controlllers/authController.js";

const router = express.Router()

router.post("/",registerUSer)
router.post("/login",loginUser)
router.post("/logout",logoutUser)



export default router