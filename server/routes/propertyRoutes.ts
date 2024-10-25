import express from "express";
import propertyController from "../controllers/propertyController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = express.Router();

router
  .route("/")
  .post(isAuth, propertyController.createProperty)
  .get(propertyController.getCreatedProperties);

router.get("/props", propertyController.getPropertyDocs);

router.get("/admin", propertyController.adminGetAllProperties);

router.get("/:id", propertyController.getPropertyById);
router.delete("/:id", isAuth, isAdmin, propertyController.deleteProperty);

router.patch("/:id/freeze", isAuth, propertyController.isActiveSwitch);

router.put("/:id/verify", isAuth, isAdmin, propertyController.verifyProperty);

export default router;
