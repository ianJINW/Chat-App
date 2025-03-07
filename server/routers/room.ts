import { Router } from "express";
import { createRoom } from "../controllers/roomController";

const router = Router();

router.post("/", createRoom);

export default router;
