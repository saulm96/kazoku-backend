import { Router } from "express";
import imageApiController from "../controller/imagesController/imageApiController.js";

const router = Router();

router.get("/", imageApiController.getAllImages);
router.post("/", imageApiController.createImage);
router.get("/:id", imageApiController.getImage);
router.put("/:id", imageApiController.updateImage);
router.delete("/:id", imageApiController.deleteImage);

export default router;


