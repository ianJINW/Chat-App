import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const createRoom = async (req: Request, res: Response) => {
	const { name } = req.body;
	if (!name) {
		res.status(400).json({ error: "Room name is required" });
		return;
	}

	try {
		const room = await prisma.room.create({
			data: { name },
		});
		res.status(201).json(room);
	} catch (error) {
		console.error("Error creating room:", error);
		res.status(500).json({ error: "Failed to create room" });
	}
};
