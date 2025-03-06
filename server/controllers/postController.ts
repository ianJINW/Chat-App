import { Request, Response } from "express";
import prisma from "../config/prisma";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
	let { post, authorId } = req.body;
	authorId = Number(authorId);
	const media = req.file?.path;

	try {
		const newPost = await prisma.posts.create({
			data: {
				post,
				media,
				authorId,
			},
		});
		res.status(201).json(newPost);
	} catch (error: any) {
		console.error("Error creating post:", error);
		res.status(500).json({ error: "Failed to create post" });
	}
};

// Fetch all posts
export const getPosts = async (req: Request, res: Response) => {
	console.log("ppp");
	try {
		const posts = await prisma.posts.findMany({
			include: {
				author: true,
				comments: true,
			},
		});

		console.log(posts);
		res.status(200).json(posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		res.status(500).json({ error: "Failed to fetch posts" });
	}
};

// Fetch a post by ID
export const getPostById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const post = await prisma.posts.findUnique({
			where: { id: Number(id) },
			include: {
				author: true,
				comments: true,
			},
		});

		if (!post) {
			res.status(404).json({ error: "Post not found" });
			return;
		}

		res.status(200).json(post);
	} catch (error) {
		console.error("Error fetching post:", error);
		res.status(500).json({ error: "Failed to fetch post" });
	}
};

// Update an existing post
export const updatePost = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { post } = req.body;
	const media = req.file?.path;

	try {
		const updatedPost = await prisma.posts.update({
			where: { id: Number(id) },
			data: {
				post,
				media,
			},
		});
		res.status(200).json(updatedPost);
	} catch (error) {
		console.error("Error updating post:", error);
		res.status(500).json({ error: "Failed to update post" });
	}
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await prisma.posts.delete({
			where: { id: Number(id) },
		});
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting post:", error);
		res.status(500).json({ error: "Failed to delete post" });
	}
};
