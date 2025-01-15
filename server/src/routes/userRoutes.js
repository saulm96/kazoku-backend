import {Router} from "express";
import userApiController from "../controller/userController/userApiController.js";

const router = Router();

router.get("/", userApiController.getAllUsers);
router.post("/", userApiController.createUser);
router.get("/city", userApiController.getUserByCity);
router.get("/country", userApiController.getUserByCountry);
router.get("/:id", userApiController.getUserById);

router.put("/:id", userApiController.updateUser);
router.delete("/:id", userApiController.deleteUser);

export default router;