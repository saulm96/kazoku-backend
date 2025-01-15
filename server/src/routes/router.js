import { Router } from "express";
import userRouter from "./userRoutes.js";
import projectRouter from "./projectsRoutes.js";
import categoryRouter from "./categoriesRoutes.js";
import imageRouter from "./imageRouter.js";

import authApiController from "../controller/auth/authApiController.js"

import { isAuthenticated} from "../middlewares/authMiddleware.js";


const router = Router();

router.use("/users",isAuthenticated ,userRouter)
router.use("/projects", projectRouter)
router.use("/categories", categoryRouter);
router.use("/images", imageRouter);


router.post("/login", authApiController.login);
router.post("/register", authApiController.register);

export default router;