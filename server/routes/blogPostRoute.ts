import { Router } from "express";
import blogPostController from "../controllers/blogPostController";
import { isAuth } from "../utils/middleware";

const router = Router();

router.post("/create-blogpost", isAuth, blogPostController.createBlogPost);
router.put(
  "/update-blogpost/:blogPostId",
  isAuth,
  blogPostController.updatePost
);
router.get("/get-posts", isAuth, blogPostController.fetchBlogPost);
router.delete(
  "/delete-post/:blogPostId",
  isAuth,
  blogPostController.deleteBlogPost
);

export default router;
