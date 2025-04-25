import { Request, Response } from "express";
import {
  fetchAllBookingTypes,
  fetchBookingTypeById,
} from "../services/bookingType.service";

export const getAllBookingTypes = async (_req: Request, res: Response) => {
  try {
    const bookingTypes = await fetchAllBookingTypes();
    res.status(200).json(bookingTypes);
  } catch (err) {
    console.error("Error fetching booking types:", (err as Error).message);
    res.status(500).send("Could not get booking_types");
  }
};

export const getBookingTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid booking_type ID format");
    }

    const bookingType = await fetchBookingTypeById(id);
    if (!bookingType) {
      return res.status(404).send(`Booking type ID ${id} not found`);
    }

    res.status(200).json(bookingType);
  } catch (err) {
    console.error("Error fetching booking type by ID:", (err as Error).message);
    res.status(500).send("Could not get booking_type by ID");
  }
};
