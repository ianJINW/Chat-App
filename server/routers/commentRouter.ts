import express from "express";
import {
	getCommentsByPost,
	createComment,
	deleteComment,
} from "../controllers/commentsController";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/", getCommentsByPost);
router.post("/", upload.single("posts"), createComment);
router.delete("/:id", deleteComment);

export default router;
