import express, { Request, Response } from "express";
import propertyRoute from "./propertyRoutes";
import blogPost from "./blogPostRoute";
import axios from "axios";
import authController from "../controllers/authController";
import passport from "passport";
import authRoutes from "./authRoutes";
import inspectionRouter from "./inspectionRoutes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/property", propertyRoute);

router.use("/blog", blogPost);

router.use("/inspection", inspectionRouter);

export default router;
