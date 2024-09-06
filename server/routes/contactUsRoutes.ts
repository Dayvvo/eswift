import { Router } from "express";
import contactUsController from "../controllers/contactUsController";

const router = Router();

router.post("/contact-us", contactUsController.sendEmail);

export default router;
