import { Request, Response } from "express";
import {
  fetchAllVisitors,
  fetchVisitorById,
} from "../services/visitor.service";

export const getAllVisitors = async (_req: Request, res: Response) => {
  try {
    const visitors = await fetchAllVisitors();
    res.status(200).json(visitors);
  } catch (err) {
    console.error("Error fetching visitors:", (err as Error).message);
    res.status(500).send("Could not get visitors");
  }
};

export const getVisitorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid visitor ID format");
    }

    const visitor = await fetchVisitorById(id);
    if (!visitor) {
      return res.status(404).send(`Visitor ID ${id} not found`);
    }

    res.status(200).json(visitor);
  } catch (err) {
    console.error("Error fetching visitor by ID:", (err as Error).message);
    res.status(500).send("Could not get visitor by ID");
  }
};
