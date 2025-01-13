import { Router } from "express";

import ProjectApiController  from "../controller/project/projectApiController.js";

const router = Router();

router.get("/projects", ProjectApiController.getAllProjects);
router.post("/projects", ProjectApiController.createProject);
router.get("/projects/:id", ProjectApiController.getProject);
router.delete("/projects/:id", ProjectApiController.deleteProject);

export default router;