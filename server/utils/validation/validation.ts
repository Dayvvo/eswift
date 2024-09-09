import Joi from 'joi'
import {
  IAddPropertyValidation,
  ILoginValidation,
} from './interface.validation'

export const validateLoginData = (login: ILoginValidation) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  })

  return loginSchema.validate(login)
}

const createBlogPostSchema = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .max(255)
    .error(new Error('Title is required and must be under 256 characters')),
  content: Joi.string()
    .required()
    .trim()
    .error(new Error('Content is required')),
  tags: Joi.array().items(Joi.string().trim()),
})

export const validateBlogPostData = (data: {
  title: string
  content: string
  tags: string[]
}) => {
  const blogPostSchema = Joi.object({
    title: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error('Title is required and must be under 256 characters')),
    content: Joi.string()
      .required()
      .trim()
      .error(new Error('Content is required')),
    tags: Joi.array().items(Joi.string().trim()),
  })

  return blogPostSchema.validate(data);
};

export const ValidateAddProperty = (property: IAddPropertyValidation) => {
  const propertySchema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    address: Joi.string().required(),
    price: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    features: Joi.array().items(Joi.string().min(2).max(50)).min(1).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required()
  })

  return propertySchema.validate(property)
}

export const createInspectionValidatorSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const getAllInspectionsValidation = Joi.object({
  per_page: Joi.number().optional(),
  page: Joi.number().optional(),
});

export const deleteInspection = Joi.object({
  id: Joi.string().required(),
});



