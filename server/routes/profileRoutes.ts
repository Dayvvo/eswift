import { Router } from "express";
import profileController from "../controllers/profileController";
import { isAuth } from "../utils/middleware";

const router = Router();

router.post("/create-profile", isAuth, profileController.createProfile);
router.put("/update-profile", isAuth, profileController.updateProfile);
router.get("/get-profile", isAuth, profileController.getProfileByUserId);

export default router;
