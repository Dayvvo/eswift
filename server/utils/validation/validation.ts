import Joi from "joi";
import { ILoginValidation } from "./interface.validation";
import { MailType } from "../service/email";

export const validateLoginData = (login: ILoginValidation) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return loginSchema.validate(login);
};

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

export const validateMailbody = ({
  email,
  name,
  subject,
  message,
}: MailType) => {
  const mailSchema = Joi.object({
    email: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error("Email is required and must be under 256 characters")),
    name: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error("name is required")),
    subject: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error("subject is required")),
    message: Joi.string()
      .required()
      .trim()
      .min(1)
      .error(new Error("Message is required")),
  });

  return mailSchema.validate({ email, name, message, subject });
};
