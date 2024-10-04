import express from "express";
import authController from "../controllers/authController";
import passport from "passport";
import propertyController from "../controllers/propertyController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = express.Router();

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: `${process.env.FRONTEND_URL}`,
  }),
  authController.googleAuthController
);

router.post("/login", authController.emailLoginAuthController);

router
  .route("/")
  .post(isAuth, propertyController.createProperty)
  .get(propertyController.getCreatedProperties);

router.get("/props", propertyController.getPropertyDocs);

router
  .route("/:id")
  .get(propertyController.getPropertyById)
  .delete(isAuth, propertyController.deleteProperty);
router.put("/:id/verify", isAuth, isAdmin, propertyController.verifyProperty);

export default router;
