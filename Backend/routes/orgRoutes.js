import express from "express";
import { createDepartment, createOrganization, createTeam, getAllDepartment, getAllTeams, getOrganizations } from "../controlllers/organizationController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/organization",verifyToken, createOrganization)
router.get("/organizations", verifyToken,getOrganizations)
router.post("/department", verifyToken,createDepartment)
router.get("/departments",verifyToken,getAllDepartment)
router.post("/team",verifyToken,createTeam)
router.get("/teams",verifyToken,getAllTeams)


export default router