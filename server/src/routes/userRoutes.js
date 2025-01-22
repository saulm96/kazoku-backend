import {Router} from "express";
import userApiController from "../controller/userController/userApiController.js";
import { isAdminOrSelfUser, isAuthenticated,  } from "../middlewares/authMiddleware.js";
import {uploadAvatar} from "../config/multer.js";


const router = Router();

router.get("/", userApiController.getAllUsers);
router.post("/", userApiController.createUser);
router.get("/city", userApiController.getUserByCity);
router.get("/country", userApiController.getUserByCountry);
router.get("/username/:username", userApiController.getUserByUsername);
router.get("/specialization", userApiController.getUserBySpecialization);
router.put("/follow",isAuthenticated ,userApiController.followUnfollowSystem);
router.put("/like-project",isAuthenticated, userApiController.likeProject);

router.get("/:id", userApiController.getUserById);

router.put("/:id", isAdminOrSelfUser, uploadAvatar ,userApiController.updateUser);
router.delete("/:id",isAdminOrSelfUser, userApiController.deleteUser);

export default router;