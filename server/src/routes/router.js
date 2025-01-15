import { Router } from "express";
import userRouter from "./userRoutes.js";
import projectRouter from "./projectsRoutes.js";
import imageRouter from "./imageRouter.js";
import chatRouter from "./chatRouter.js";
import styleRouter from "./styleRouter.js";
import subjectRouter from "./subjectRouter.js";
import typeRouter from "./typeRouter.js";

import authApiController from "../controller/auth/authApiController.js"


const router = Router();

router.use("/users", userRouter)
router.use("/projects", projectRouter)
router.use("/images", imageRouter);
router.use("/chats", chatRouter);
router.use("/styles", styleRouter);
router.use("/subjects", subjectRouter);
router.use("/types", typeRouter);



router.post("/login", authApiController.login);
router.post("/register", authApiController.register);

export default router;