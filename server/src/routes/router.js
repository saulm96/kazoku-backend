import { Router } from "express";

import projectApiController  from "../controller/project/projectApiController.js";
import categoryApiController from "../controller/category/categoryApiController.js";
import imageApiController from "../controller/images/imageApiController.js";
import userApiController from "../controller/userController/userApiController.js";

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

router.get("/users", userApiController.getAllUsers);
router.post("/users", userApiController.createUser);
router.get("/users/:id", userApiController.getUserById);
router.get("/users/:country", userApiController.getUserByCountry);
router.put("/users/:id", userApiController.updateUser);
router.delete("/users/:id", userApiController.deleteUser);





export default router;