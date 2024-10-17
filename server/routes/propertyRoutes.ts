import express from "express";
import propertyController from "../controllers/propertyController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = express.Router();


router
  .route("/")
  .post(isAuth, propertyController.createProperty)
  .get(propertyController.getCreatedProperties);

router.get("/props", propertyController.getPropertyDocs);

router
  .route("/:id")
  .get(propertyController.getPropertyById)
  .delete(isAuth, propertyController.deleteProperty);

router.patch('/:id/freeze', isAuth, propertyController.isActiveSwitch); 

router.put("/:id/verify", isAuth, isAdmin, propertyController.verifyProperty);

export default router;
