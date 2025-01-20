// chatRouter.js
import { Router } from "express";
import chatApiController from "../controller/chatController/chatApiController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

// Proteger todas las rutas del chat con autenticación
router.use(isAuthenticated);

router.get("/", chatApiController.getAllChats);
router.get("/user/:userId", chatApiController.getAllChatsByUser);
router.post("/", chatApiController.createChat);
router.get("/:id", chatApiController.getById);
router.put("/:chatId", chatApiController.addMessage);
/* router.put("/chats/:chatId/read", chatApiController.markAsRead);
router.put("/chats/:chatId/status", chatApiController.updateStatus); */

export default router;