import { Request, Response } from "express";
import { getChatResponse } from "../services/chatService";

export const handleChatMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Valid message is required" });
      return;
    }

    const response = await getChatResponse(message);
    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
};