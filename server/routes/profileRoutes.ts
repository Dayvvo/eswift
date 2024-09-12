import { Router } from "express";
import profileController from "../controllers/profileController";
import userController from "../controllers/userController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = Router();

router.post("/profile", isAuth, profileController.createProfile);
router.put("/profile", isAuth, profileController.updateProfile);
router.get("/profile", isAuth, profileController.getProfileByUserId);
router.get("/users", isAuth, isAdmin, userController.getAllUsers);
router.get("/users/:userId", isAuth, isAdmin, userController.getUserById);
router.put(
  "/users/:userId/verification",
  isAuth,
  isAdmin,
  userController.verifyUser
);

export default router;
