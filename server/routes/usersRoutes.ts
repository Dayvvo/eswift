import { Router } from "express";
import userController from "../controllers/userController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = Router();

router.get("/", isAuth, isAdmin, userController.getAllUsers);

router.get("/:userId", isAuth, isAdmin, userController.getUserById);

router.put(
  "/:userId/verify",
  isAuth,
  isAdmin,
  userController.verifyUser
);   

router.post('/add', userController.addUser);

export default router;
