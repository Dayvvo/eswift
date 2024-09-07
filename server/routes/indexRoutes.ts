import express, { Request, Response } from "express";
import propertyRoute from "./propertyRoutes";
import blogPost from "./blogPostRoute";
import uploadRoute from './uploadRoutes'
import axios from "axios";
import authController from "../controllers/authController";
import passport from "passport";
import authRoutes from "./authRoutes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/property", propertyRoute);

router.use("/blog", blogPost);

router.use("/upload", uploadRoute)

export default router;
