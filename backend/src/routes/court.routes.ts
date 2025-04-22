import express from "express";
import { getAllCourts, getCourtById } from "../controllers/courtController";

const router = express.Router();

router.get("/", getAllCourts);
router.get("/:id", getCourtById);

export default router;
