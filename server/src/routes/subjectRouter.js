import { Router } from "express";
import subjectApiController from "../controller/subjectController/subjectApiController.js";

const router = Router();

router.get("/", subjectApiController.getAllSubjects);
router.post("/", subjectApiController.createSubject);
router.get("/:id", subjectApiController.getSubject);
router.put("/:id", subjectApiController.updateSubject);
router.delete("/:id", subjectApiController.deleteSubject);

export default router;