import { Router } from "express";
import categoryApiController from "../controller/category/categoryApiController.js";

const router = Router();


router.get("/", categoryApiController.getAllCategories);
router.post("/", categoryApiController.createCategory);
router.get("/:id", categoryApiController.getCategory);
router.put("/:id", categoryApiController.updateCategory);
router.delete("/:id", categoryApiController.deleteCategory);

export default router;