import express from "express";
import * as memberController from "../controllers/memberController";

const router = express.Router();

router.get("/", memberController.getMembers);
router.get("/:id", memberController.getMemberById);
router.get("/email/:email", memberController.getMemberByEmail);

export default router;
