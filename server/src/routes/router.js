import { Router } from "express";

import projectApiController  from "../controller/projectController/projectApiController.js";
import categoryApiController from "../controller/categoryController/categoryApiController.js";
import imageApiController from "../controller/imagesController/imageApiController.js";
import userApiController from "../controller/userController/userApiController.js";
import typeApiController from "../controller/typeController/typeApiController.js";
import subjectApiController from "../controller/subjectController/subjectApiController.js";
import styleApiController from "../controller/styleController/styleApiController.js";


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

router.get("/types", typeApiController.getAllTypes);
router.post("/types", typeApiController.createType);
router.get("/types/:id", typeApiController.getType);
router.put("/types/:id", typeApiController.updateType);
router.delete("/types/:id", typeApiController.deleteType);

router.get("/subjects", subjectApiController.getAllSubjects);
router.post("/subjects", subjectApiController.createSubject);
router.get("/subjects/:id", subjectApiController.getSubject);
router.put("/subjects/:id", subjectApiController.updateSubject);
router.delete("/subjects/:id", subjectApiController.deleteSubject);

router.get("/styles", styleApiController.getAllStyles);
router.post("/styles", styleApiController.createStyle);
router.get("/styles/:id", styleApiController.getStyle);
router.put("/styles/:id", styleApiController.updateStyle);
router.delete("/styles/:id", styleApiController.deleteStyle);


export default router;