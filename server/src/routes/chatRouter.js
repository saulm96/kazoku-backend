import {Router} from "express";
import chatApiController from "../controller/chatController/chatApiController.js";

const router = Router();

router.get("/", chatApiController.getAllChatsByUser);
router.post("/", chatApiController.createChat);
router.get("/:id", chatApiController.getById);
router.put("/:id", chatApiController.addMessage);

export default router;