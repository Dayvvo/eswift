import { Router } from "express";
import userController from "../controllers/userController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = Router();

router.get("/users", isAuth, isAdmin, userController.getAllUsers);
router.get("/users/:userId", isAuth, isAdmin, userController.getUserById);
router.put(
  "/users/:userId/verification",
  isAuth,
  isAdmin,
  userController.verifyUser
);

export default router;
