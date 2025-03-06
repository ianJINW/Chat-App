import express from "express";
import {
	getPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
} from "../controllers/postController";
import { posts } from "../middleware/multer";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", posts.single("posts"), createPost);
router.put("/:id", posts.single("posts"), updatePost);
router.delete("/:id", deletePost);

export default router;
