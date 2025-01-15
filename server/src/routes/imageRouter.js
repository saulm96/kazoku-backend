import { Router } from "express";
import imageApiController from "../controller/images/imageApiController.js";

const router = Router();

router.get("/images", imageApiController.getAllImages);
router.post("/images", imageApiController.createImage);
router.get("/images/:id", imageApiController.getImage);
router.put("/images/:id", imageApiController.updateImage);
router.delete("/images/:id", imageApiController.deleteImage);

export default router;


