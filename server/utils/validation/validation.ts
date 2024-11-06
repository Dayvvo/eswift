import Joi from "joi";
import {
  IAddPropertyValidation,
  ILoginValidation,
  ISignupValidation,
} from "../interfaces/interface.validation";
import { MailType } from "../interfaces/mailtype.interface";
import { ProfileInterface } from "../interfaces/profile.interface";
import { PaymentMode, UserRole } from "../interfaces";
import { PropertyDocuments } from "../interfaces/types";

export const validateLoginData = (login: ILoginValidation) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return loginSchema.validate(login);
};

export const validateSignupData = (signup: ISignupValidation) => {
  const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.valid(
      UserRole.CLIENT,
      UserRole.AFFILIATE,
      UserRole.ADMIN,
      UserRole.AGENT
    ).optional(),
    phoneNumber: Joi.string()
      .pattern(/^(\+?\d{1,4}|\d{1,4})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .allow(""),
    address: Joi.string().min(4).allow(""),
  });

  return signupSchema.validate(signup);
};

export const validateBlogPostData = (data: {
  title: string;
  header_image: string;
  introduction: string;
  body: string;
  body_image: string;
  // tags: string[];
}) => {
  const blogPostSchema = Joi.object({
    title: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error("Title is required and must be under 256 characters")),
    header_image: Joi.string().uri().required(),
    introduction: Joi.string()
      .required()
      .trim()
      .min(5)
      .error(new Error("Introduction is required")),
    body: Joi.string()
      .required()
      .trim()
      .error(new Error("Content is required")),
    body_image: Joi.string().uri().required(),
    // tags: Joi.array().items(Joi.string().trim()),
  });

  return blogPostSchema.validate(data);
};

export const ValidateAddProperty = (property: IAddPropertyValidation) => {
  const documentSchema = Joi.object({
    type: Joi.string()
      .valid(...Object.values(PropertyDocuments))
      .required(),
    document: Joi.string().required(),
  });

  const priceSchema = Joi.object({
    mode: Joi.string()
      .valid(...Object.values(PaymentMode))
      .required(),

    amount: Joi.string()
      .pattern(/^\d+(\.\d{1,2})?$/)
      .required(),
  });

  const propertySchema = Joi.object({
    title: Joi.string().required(),
    address: Joi.string().required(),
    price: priceSchema.required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    features: Joi.array().items(Joi.string().min(2).max(50)).min(1).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    documents: Joi.array().items(documentSchema).required(),
  });

  return propertySchema.validate(property);
};

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

export const validateMailbody = (emailData: MailType) => {
  const mailSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error("first name is required")),
    email: Joi.string()
      .required()
      .trim()
      .min(1)
      // .max(255)
      .email({ tlds: { allow: false } })
      .error(new Error("Email is required")),
    lastName: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(255)
      .error(new Error("last name is required")),
    message: Joi.string()
      .required()
      .trim()
      .min(1)
      .error(new Error("Message is required")),
    howDidYouHear: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    inquiryType: Joi.string().required(),
  });

  return mailSchema.validate(emailData);
};

export const validateProfile = (userProfile: ProfileInterface) => {
  const profileSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    residentialAddress: Joi.string().required(),
    officeAddress: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    areYouAnExistingCustomer: Joi.boolean().required(),
    howDidYouHearAboutUs: Joi.string().required(),
    modeOfIdentification: Joi.string().required(),
    idDocument: Joi.string().required(),
    passport: Joi.string().required(),
    agentIdProof: Joi.string().required(),
    currentOccupation: Joi.string().required(),
  });
  return profileSchema.validate(userProfile);
};
