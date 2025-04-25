import { Request, Response } from "express";
import {
  fetchAllMembers,
  fetchMemberById,
  fetchMemberByEmail,
} from "../services/member.service";

export const getMembers = async (_req: Request, res: Response) => {
  try {
    const members = await fetchAllMembers();
    res.status(200).json(members);
  } catch (err) {
    console.error("Error fetching members:", (err as Error).message);
    res.status(500).send("Could not get members");
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid member ID format");
    }

    const member = await fetchMemberById(id);
    if (!member) {
      return res.status(404).send(`Member ID ${id} not found`);
    }

    res.status(200).json(member);
  } catch (err) {
    console.error("Error fetching member by ID:", (err as Error).message);
    res.status(500).send("Could not get member by ID");
  }
};

export const getMemberByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email || !email.includes("@")) {
      return res.status(400).send("Invalid email format");
    }

    const member = await fetchMemberByEmail(email);
    if (!member) {
      return res.status(404).send(`No member found with email: ${email}`);
    }

    res.status(200).json(member);
  } catch (err) {
    console.error("Error fetching member by email:", (err as Error).message);
    res.status(500).send("Could not get member by email");
  }
};
