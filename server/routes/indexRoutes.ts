import express from "express";
import propertyRoute from "./propertyRoutes";
import blogPost from "./blogPostRoute";
import contact from "./contactUsRoutes";
import authRoutes from "./authRoutes";
import inspectionRoute from "./inspectionRoutes";
import profile from "./profileRoutes";
import users from "./usersRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/property", propertyRoute);
router.use("/blog", blogPost);
router.use("/contact", contact);
router.use("/user-detail", profile);
router.use("/user", users);
router.use("/inspection", inspectionRoute);

export default router;
