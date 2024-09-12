import express from "express";
import propertyRoute from "./propertyRoutes";
import blogPost from "./blogPostRoute";
import contact from "./contactUsRoutes";
import uploadRoute from "./uploadRoutes";
import authRoutes from "./authRoutes";
import inspectionRoute from "./inspectionRoutes";
import profile from "./profileRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/property", propertyRoute);
router.use("/blog", blogPost);
router.use("/contact", contact);
router.use("/user", profile);
router.use("/inspection", inspectionRoute);

router.use("/upload", uploadRoute);

export default router;
