import { Request, Response } from "express";
import {
  fetchAllCourts,
  fetchCourtById,
} from "../services/court.service";

export const getAllCourts = async (_req: Request, res: Response) => {
  try {
    const courts = await fetchAllCourts();
    res.status(200).json(courts);
    console.log("Success: Get all courts");
  } catch (err) {
    console.error("Error fetching courts:", (err as Error).message);
    res.status(500).send("Could not get courts");
  }
};

export const getCourtById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid court ID format");
    }

    const court = await fetchCourtById(id);
    if (!court) {
      return res.status(404).send(`Court ID ${id} not found`);
    }

    res.status(200).json(court);
    console.log(`Success: Get court by ID ${id}`);
  } catch (err) {
    console.error("Error fetching court by ID:", (err as Error).message);
    res.status(500).send("Could not get court by ID");
  }
};
