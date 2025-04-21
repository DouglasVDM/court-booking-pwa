import express from "express";
import {
  getAllVisitors,
  getVisitorById,
} from "../controllers/visitorController";

const router = express.Router();

router.get("/", getAllVisitors);
router.get("/:id", getVisitorById);

export default router;
