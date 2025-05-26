import { Router } from "express";
import { handleChatMessage } from "../controllers/chatController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.post("/chat", isAuthenticated, handleChatMessage);

export default router;