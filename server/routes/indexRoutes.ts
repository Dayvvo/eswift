import express, { Request, Response } from "express";
import propertyRoute from "./propertyRoutes";
import blogPost from "./blogPostRoute";
import contact from "./contactUs";
import axios from "axios";
import authController from "../controllers/authController";
import passport from "passport";
import authRoutes from "./authRoutes";
import profile from "./profileRoutes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/property", propertyRoute);

router.use("/blog", blogPost);
router.use("/email", contact);
router.use("/profile", profile);

export default router;
