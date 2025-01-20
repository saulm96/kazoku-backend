import {Router} from "express";
import userApiController from "../controller/userController/userApiController.js";
import { isAdminOrSelfUser, isAuthenticated,  } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", userApiController.getAllUsers);
router.post("/", userApiController.createUser);
router.get("/city", userApiController.getUserByCity);
router.get("/country", userApiController.getUserByCountry);
router.put("/follow/",isAuthenticated ,userApiController.followUnfollowSystem);
router.put("/like/", userApiController.likeProject);

router.get("/:id", userApiController.getUserById);

router.put("/:id", isAdminOrSelfUser,userApiController.updateUser);
router.delete("/:id",isAdminOrSelfUser, userApiController.deleteUser);

export default router;