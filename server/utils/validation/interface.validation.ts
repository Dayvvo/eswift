export interface ILoginValidation {
  email: string
  password: string
}

export interface IAddPropertyValidation {
  title: string
  type: string
  address: string
  price: string
  category: string
  description: string
  features: Array<string>
  images: Array<string>
}
