import { Request, Response } from "express";
import {
  fetchAllEndTimes,
  fetchEndTimeById,
} from "../services/endTime.service";

export const getAllEndTimes = async (_req: Request, res: Response) => {
  try {
    const endTimes = await fetchAllEndTimes();
    res.status(200).json(endTimes);
  } catch (err) {
    console.error("Error fetching end times:", (err as Error).message);
    res.status(500).send("Could not get end times");
  }
};

export const getEndTimeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid end time ID format");
    }

    const endTime = await fetchEndTimeById(id);
    if (!endTime) {
      return res.status(404).send(`End time ID ${id} not found`);
    }

    res.status(200).json(endTime);
  } catch (err) {
    console.error("Error fetching end time by ID:", (err as Error).message);
    res.status(500).send("Could not get end time by ID");
  }
};
