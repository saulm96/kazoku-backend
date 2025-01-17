import {Router} from "express";
import projectApiController from "../controller/projectController/projectApiController.js";

const router = Router();

router.get("/", projectApiController.getAllProjects);
router.post('/', projectApiController.uploadMiddleware, projectApiController.createProject);
router.get("/:id", projectApiController.getProject);
router.delete("/:id", projectApiController.deleteProject);
router.put('/projects/:id', projectApiController.uploadMiddleware, projectApiController.updateProject);
export default router;
router.post('/projects/:projectId/images', projectApiController.uploadMiddleware,projectApiController.createProject
);