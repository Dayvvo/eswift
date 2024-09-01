import { Request, Response } from "express";
import BlogPost from "../models/BlogPost";
import { validateBlogPostData } from "../utils/validation";

class BlogPostController {
  createBlogPost = async (req: Request, res: Response) => {
    try {
      const { error, value } = validateBlogPostData(req.body);
      if (error) {
        console.log("error", error.message);
        return res.status(400).json(error.message);
      }
      //   const author = req.user;
      const blogPost = new BlogPost(value);
      await blogPost.save();
      return res.status(200).json({
        statusCode: 200,
        data: blogPost,
        message: "Blog post created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to create blog post");
    }
  };

  updatePost = async (req: Request, res: Response) => {
    try {
      const { error, value } = validateBlogPostData(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const blogPost = await BlogPost.findOneAndUpdate(
        { _id: req.params.blogPostId },
        { ...value },
        { new: true }
      );
      return res.status(200).json({
        statusCode: 200,
        message: "updated successfully",
        data: blogPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to update blog post");
    }
  };

  fetchBlogPost = async (req: Request, res: Response) => {
    try {
      const blogpost = await BlogPost.find();
      return res.status(200).json({
        statusCode: 200,
        message: "fetched successfully",
        data: blogpost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to fetch blog posts");
    }
  };

  fetchBlogPostById = async (req: Request, res: Response) => {
    try {
      const blogPostDetail = await BlogPost.findById(req.params.blogPostId);
      return res.status(200).json({
        message: "Fetched successfully",
        data: blogPostDetail,
        statusCode: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to fetch blog post details");
    }
  };

  deleteBlogPost = async (req: Request, res: Response) => {
    try {
      const blogpost = await BlogPost.deleteOne({
        _id: req.params.blogPostId,
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Deleted successfully",
        data: blogpost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
}

let blogPostController = new BlogPostController();

export default blogPostController;
