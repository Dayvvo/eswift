import { Router } from "express";
import blogPostController from "../controllers/blogPostController";
import { isAuth } from "../utils/middleware";

const router = Router();

router.post("/post",  blogPostController.createBlogPost);
router.put("/post/:blogPostId",  blogPostController.updatePost);
router.get("/post",  blogPostController.fetchBlogPost);
router.get("/post/:blogPostId", blogPostController.fetchBlogPostById);
router.delete(
  "/delete-post/:blogPostId",
  blogPostController.deleteBlogPost
);

export default router;
