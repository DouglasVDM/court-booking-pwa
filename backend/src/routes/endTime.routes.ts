import express from "express";
import { getAllEndTimes, getEndTimeById } from "../controllers/endTimeController";

const router = express.Router();

router.get("/", getAllEndTimes);
router.get("/:id", getEndTimeById);

export default router;
