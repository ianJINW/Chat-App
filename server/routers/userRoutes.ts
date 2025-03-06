import express from "express";
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getUserById,
	login,
	logout,
} from "../controllers/userController";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/", getUsers);
router.post("/", upload.single("profile"), createUser);
router.put("/:id", upload.single("profile"), updateUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.route("/logout").post(logout);
router.route("/login").post(login);

export default router;
