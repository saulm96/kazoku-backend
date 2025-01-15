import {Router} from "express";
import projectApiController from "../controller/projectController/projectApiController.js";

const router = Router();

router.get("/", projectApiController.getAllProjects);
router.post("/", projectApiController.createProject);
router.get("/:id", projectApiController.getProject);
router.delete("/:id", projectApiController.deleteProject);

export default router;
