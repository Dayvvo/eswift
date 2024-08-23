import express, {Request, Response} from "express"
import axios from 'axios';
import authController from "../controllers/authController";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
)

router.get(
  "/google-inapp",
  passport.authenticate("", {
    scope: ["email", "profile"],
    state: "inapp",
  })
)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: `${process.env.FRONTEND_URL}`,
  }),
  authController.googleAuthController
)
export default router;