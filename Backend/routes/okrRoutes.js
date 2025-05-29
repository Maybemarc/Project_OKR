import express from "express";
import { createOKR, deleteOKR, getOKRsByTeam, updateKeyResult } from "../controlllers/okrController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/",verifyToken,createOKR)
router.get("/team/:teamId",verifyToken,getOKRsByTeam)
router.put("/:okrId/keyresult/:krIndex",verifyToken,updateKeyResult)
router.delete("/:id",verifyToken,deleteOKR)


export default router