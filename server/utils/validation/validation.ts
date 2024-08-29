import Joi from "joi";

export const validateLoginData = (login: {
  email: string;
  password: string;
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return loginSchema.validate(login);
};

const createBlogPostSchema = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .max(255)
    .error(new Error("Title is required and must be under 256 characters")),
  content: Joi.string()
    .required()
    .trim()
    .error(new Error("Content is required")),
  tags: Joi.array().items(Joi.string().trim()),
});

export const validateBlogPostData = (data: {
  title: string;
  content: string;
  tags: string[];
}) => {
  const blogPostSchema = Joi.object({
    title: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error("Title is required and must be under 256 characters")),
    content: Joi.string()
      .required()
      .trim()
      .error(new Error("Content is required")),
    tags: Joi.array().items(Joi.string().trim()),
  });

  return blogPostSchema.validate(data);
};
