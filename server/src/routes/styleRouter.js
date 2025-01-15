import { Router } from "express";
import styleApiController from "../controller/styleController/styleApiController.js";

const router = Router();

router.get("/", styleApiController.getAllStyles);
router.post("/", styleApiController.createStyle);
router.get("/:id", styleApiController.getStyle);
router.put("/:id", styleApiController.updateStyle);
router.delete("/:id", styleApiController.deleteStyle);

export default router