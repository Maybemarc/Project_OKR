import express from "express";
import { createDepartment, createOrganization, createTeam, getOrganizations } from "../controlllers/organizationController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/organization",verifyToken, createOrganization)
router.get("/organizations", verifyToken,getOrganizations)
router.post("/department", verifyToken,createDepartment)
router.post("/team",createTeam)


export default router