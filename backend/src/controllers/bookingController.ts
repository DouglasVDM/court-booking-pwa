import { Request, Response } from "express";
import * as bookingService from "../services/booking.service";

export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await bookingService.fetchAllBookings();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).send("Could not get bookings");
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await bookingService.fetchBookingById(id);
    if (!booking) {
      return res.status(404).send(`Booking id ${id} not found`);
    }
    res.status(200).json(booking);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).send("Could not get booking by ID");
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = await bookingService.createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err: any) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: err.message || "Failed to create booking" });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const updated = await bookingService.updateBooking(req.params.id, req.body);
    if (!updated) {
      return res.status(404).send("Booking not found");
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).send("Could not update booking");
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const deleted = await bookingService.deleteBooking(req.params.id);
    if (!deleted) {
      return res.status(404).send("Booking not found");
    }
    res.status(200).send(`Booking ID ${req.params.id} deleted successfully`);
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).send("Could not delete booking");
  }
};
