import {Router} from "express";
import projectApiController from "../controller/projectController/projectApiController.js";
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = Router();

router.get("/", projectApiController.getAllProjects);
router.post('/', projectApiController.uploadMiddleware, projectApiController.createProject);
router.post('/own', isAuthenticated, projectApiController.uploadMiddleware, projectApiController.createOwnProject);
router.get("/filter", projectApiController.getProyectByMultipleFilters);
router.get("/:id", projectApiController.getProject);
router.delete("/:id", projectApiController.deleteProject);
router.put('/:id', projectApiController.uploadMiddleware, projectApiController.updateProject);
router.post('/:id/images', projectApiController.uploadMiddleware,projectApiController.createProject);

export default router;
