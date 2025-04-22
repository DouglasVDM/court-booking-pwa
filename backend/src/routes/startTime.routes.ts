import express from "express";
import {
  getAllStartTimes,
  getStartTimeById,
} from "../controllers/startTimeController";

const router = express.Router();

router.get("/", getAllStartTimes);
router.get("/:id", getStartTimeById);

export default router;
