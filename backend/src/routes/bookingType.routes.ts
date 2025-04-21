import express from "express";
import {
  getAllBookingTypes,
  getBookingTypeById,
} from "../controllers/bookingTypeController";

const router = express.Router();

router.get("/", getAllBookingTypes);
router.get("/:id", getBookingTypeById);

export default router;