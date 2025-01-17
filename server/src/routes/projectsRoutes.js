import {Router} from "express";
import projectApiController from "../controller/projectController/projectApiController.js";

const router = Router();

router.get("/", projectApiController.getAllProjects);
router.post('/', projectApiController.uploadMiddleware, projectApiController.createProject);
router.post('/projects/own', projectApiController.uploadMiddleware, projectApiController.createOwnProject);
router.get("/:id", projectApiController.getProject);
router.delete("/:id", projectApiController.deleteProject);
router.put('/projects/:id', projectApiController.uploadMiddleware, projectApiController.updateProject);
router.post('/projects/:projectId/images', projectApiController.uploadMiddleware,projectApiController.createProject);

export default router;
