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
      res.status(500).send("Internal Server Error");
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
      res.status(500).send("Internal Server Error");
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
      res.status(500).send("Internal Server Error");
    }
  };
    
  deleteBlogPost = async (req: Request, res: Response) => {
    try {
      const blogpost = await BlogPost.deleteOne({
        _id: req.params.blogpostId,
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
