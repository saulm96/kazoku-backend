import { Router } from "express";
import imageApiController from "../controller/imagesController/imageApiController.js";

const router = Router();

router.get("/", imageApiController.getAllImages);
router.get("/:id", imageApiController.getImage);
/* router.put("/:id", imageApiController.updateImage); */
router.delete("/:id", imageApiController.deleteImage);
router.post('/', imageApiController.createImage);
export default router;


