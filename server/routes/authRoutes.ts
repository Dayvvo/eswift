import express from "express"
import authController from "../controllers/authController";
import passport from "passport";
import { isAuth } from "../utils/middleware";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: `${process.env.FRONTEND_URL}`,
  }),
  authController.googleAuthController
);

router.post('/login', authController.emailLoginAuthController)
export default router;