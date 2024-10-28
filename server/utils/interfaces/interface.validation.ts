import { UserRole } from "../interfaces";

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface ISignupValidation {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface IAddPropertyValidation {
  title: string;
  type: string;
  address: string;
  price: string;
  category: string;
  duration: string;
  description: string;
  features: Array<string>;
  images: Array<string>;
}
