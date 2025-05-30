import express from "express";
import { createOKR, deleteOKR, getOKRByid, getOKRsByTeam, getOKRsByUser, updateKeyResult, updateOKR } from "../controlllers/okrController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/",verifyToken,createOKR)
router.get("/team/:teamId",verifyToken,getOKRsByTeam)
router.put("/:okrId/keyresult/:krIndex",verifyToken,updateKeyResult)
router.delete("/:id",verifyToken,deleteOKR)

router.get("/:id",verifyToken,getOKRByid);
router.put("/update/:id",verifyToken,updateOKR)

router.get("/userprogress/:userId",verifyToken,getOKRsByUser)

export default router