import express, { Request, Response } from "express";
import propertyRoute from "./propertyRoutes";
import blogPost from "./blogPostRoute";
import contact from "./contactUsRoutes";
import axios from "axios";
import authController from "../controllers/authController";
import passport from "passport";
import authRoutes from "./authRoutes";
import profile from "./profileRoutes";
import users from "./usersRoutes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/property", propertyRoute);

router.use("/blog", blogPost);
router.use("/email", contact);
router.use("/user-detail", profile);
router.use("/user", users);

export default router;
