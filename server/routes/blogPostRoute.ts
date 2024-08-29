import { Router } from "express";
import blogPostController from "../controllers/blogPostController";

const router = Router();

router.post("/create-blogpost", blogPostController.createBlogPost);
router.put("/update-blogpost/:blogPostId", blogPostController.updatePost);
router.get("/get-posts", blogPostController.fetchBlogPost);
router.delete("/delete-post/:blogPostId", blogPostController.deleteBlogPost);

export default router;