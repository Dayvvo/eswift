import { Router } from "express";
import blogPostController from "../controllers/blogPostController";
import { isAuth } from "../utils/middleware";

const router = Router();

router.post("/post", isAuth, blogPostController.createBlogPost);
router.put("/post/:blogPostId", isAuth, blogPostController.updatePost);
router.get("/post", isAuth, blogPostController.fetchBlogPost);
router.get("/post/:blogPostId", blogPostController.fetchBlogPostById);
router.delete(
  "/delete-post/:blogPostId",
  isAuth,
  blogPostController.deleteBlogPost
);

export default router;
