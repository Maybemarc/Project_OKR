import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  deleteDepartment,
  deleteTeam,
} from "../controlllers/adminController.js";

const router = express.Router();

router.delete("/users/:id", verifyToken, isAdmin, deleteUser);
router.delete("/departments/:id", verifyToken, isAdmin, deleteDepartment);
router.delete("/teams/:id", verifyToken, isAdmin, deleteTeam);

export default router;
