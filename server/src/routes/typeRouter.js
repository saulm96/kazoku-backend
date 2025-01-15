import { Router } from "express";
import typeApiController from "../controller/typeController/typeApiController.js";

const router = Router();

router.get("/", typeApiController.getAllTypes);
router.post("/", typeApiController.createType);
router.get("/:id", typeApiController.getType);
router.put("/:id", typeApiController.updateType);
router.delete("/:id", typeApiController.deleteType);

export default router;