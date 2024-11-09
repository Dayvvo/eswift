import { Router } from "express";
import profileController from "../controllers/profileController";
import userController from "../controllers/userController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = Router();

router.post("/profile", isAuth, profileController.createProfile);
router.put("/profile", isAuth, userController.updateUser);
router.get("/profile", isAuth, profileController.getProfileByUserId);
router.get("/users", userController.getAllUsers);
router.get("/users/:userId", userController.getUserById);
router.put(
  "/users/:userId/verification",
  isAuth,
  isAdmin,
  userController.verifyUser
);
router.post("/add-user", userController.addUser);

export default router;
