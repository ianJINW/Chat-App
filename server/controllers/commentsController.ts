import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createComment = async (req: Request, res: Response) => {
	const { text, postId, userId } = req.body;
	const media = req.file?.path;

	try {
		const newComment = await prisma.comments.create({
			data: {
				media,
				text,
				postId: Number(postId),
				userId: Number(userId),
			},
		});
		res.status(201).json(newComment);
	} catch (error) {
		res.status(500).json({ error: "Failed to create comment" });
	}
};

export const getCommentsByPost = async (req: Request, res: Response) => {
	const { postId } = req.params;

	try {
		const comments = await prisma.comments.findMany({
			where: { postId: Number(postId) },
			include: {
				user: true,
			},
		});
		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch comments" });
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await prisma.comments.delete({
			where: { id: Number(id) },
		});
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Failed to delete comment" });
	}
};
