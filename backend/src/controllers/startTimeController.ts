import { Request, Response } from "express";
import {
  fetchAllStartTimes,
  fetchStartTimeById,
} from "../services/startTime.service";

export const getAllStartTimes = async (_req: Request, res: Response) => {
  try {
    const startTimes = await fetchAllStartTimes();
    res.status(200).json(startTimes);
  } catch (err) {
    console.error("Error fetching start times:", (err as Error).message);
    res.status(500).send("Could not get time slots");
  }
};

export const getStartTimeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid time slot ID format");
    }

    const startTime = await fetchStartTimeById(id);
    if (!startTime) {
      return res.status(404).send(`Time slot ID ${id} not found`);
    }

    res.status(200).json(startTime);
  } catch (err) {
    console.error("Error fetching start time by ID:", (err as Error).message);
    res.status(500).send("Could not get time slot by ID");
  }
};
