import { Router } from "express";

import projectApiController  from "../controller/project/projectApiController.js";
import categoryApiController from "../controller/category/categoryApiController.js";
import imageApiController from "../controller/images/imageApiController.js";

const router = Router();

router.get("/projects", projectApiController.getAllProjects);
router.post("/projects", projectApiController.createProject);
router.get("/projects/:id", projectApiController.getProject);
router.delete("/projects/:id", projectApiController.deleteProject);

router.get("/categories", categoryApiController.getAllCategories);
router.post("/categories", categoryApiController.createCategory);
router.get("/categories/:id", categoryApiController.getCategory);
router.put("/categories/:id", categoryApiController.updateCategory);
router.delete("/categories/:id", categoryApiController.deleteCategory);

router.get("/images", imageApiController.getAllImages);
router.post("/images", imageApiController.createImage);
router.get("/images/:id", imageApiController.getImage);
router.put("/images/:id", imageApiController.updateImage);
router.delete("/images/:id", imageApiController.deleteImage);



export default router;