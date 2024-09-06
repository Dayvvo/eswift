import { Router } from "express";
import profileController from "../controllers/profileController";
import { isAuth } from "../utils/middleware";

const router = Router();

router.post("/profile", isAuth, profileController.createProfile);
router.put("/profile", isAuth, profileController.updateProfile);
router.get("/profile", isAuth, profileController.getProfileByUserId);

export default router;
