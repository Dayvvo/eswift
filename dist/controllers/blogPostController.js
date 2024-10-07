import BlogPost from "../models/BlogPost";
import { validateBlogPostData } from "../utils/validation";
class BlogPostController {
    constructor() {
        this.createBlogPost = async (req, res) => {
            try {
                const { error, value } = validateBlogPostData(req.body);
                if (error) {
                    return res.status(400).json(error.message);
                }
                const user = req.user;
                const blogPost = new BlogPost({ ...value, author: user?._id });
                await blogPost.save();
                return res.status(201).json({
                    statusCode: 201,
                    data: blogPost,
                    message: "Blog post created",
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Failed to create blog post");
            }
        };
        this.updatePost = async (req, res) => {
            try {
                const { error, value } = validateBlogPostData(req.body);
                if (error) {
                    return res.status(400).json(error.message);
                }
                const user = req.user;
                const blogPost = await BlogPost.findOneAndUpdate({ _id: req.params.blogPostId, author: user?._id }, { ...value }, { new: true });
                return res.status(201).json({
                    statusCode: 201,
                    message: "updated successfully",
                    data: blogPost,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Failed to update blog post");
            }
        };
        this.fetchBlogPost = async (req, res) => {
            const page = parseInt(req.query.page) || 1;
            const POST_PER_PAGE = 50;
            const skip = (page - 1) * POST_PER_PAGE;
            try {
                const author = req.user;
                const totalPost = await BlogPost.find().countDocuments();
                const blogpost = await BlogPost.find().skip(skip).limit(POST_PER_PAGE);
                return res.status(200).json({
                    statusCode: 200,
                    message: "fetched successfully",
                    data: blogpost,
                    totalBlogPost: totalPost,
                    hasNextPage: POST_PER_PAGE * page < totalPost,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalPost / POST_PER_PAGE),
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Failed to fetch blog posts");
            }
        };
        this.fetchBlogPostById = async (req, res) => {
            try {
                const blogPostDetail = await BlogPost.findById(req.params.blogPostId);
                return res.status(200).json({
                    message: "Fetched successfully",
                    data: blogPostDetail,
                    statusCode: 200,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Failed to fetch blog post details");
            }
        };
        this.deleteBlogPost = async (req, res) => {
            try {
                const user = req.user;
                const blogpost = await BlogPost.deleteOne({
                    _id: req.params.blogPostId,
                    author: user?._id,
                });
                return res.status(200).json({
                    statusCode: 200,
                    message: "Deleted successfully",
                    data: blogpost,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Internal Server Error");
            }
        };
    }
}
let blogPostController = new BlogPostController();
export default blogPostController;
