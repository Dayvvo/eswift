export enum PropertyOwner {
  'ESWIFT' = 'ESWIFT',
  'AFFILIATE' = 'AFFILIATE',
}

export interface ILocation {
  state: string
  lga: string
  address: string
}

export interface IProperty {
  title: string
  description: string
  address: string
  type: string
  category: string
  features: Array<string>
  price: string
  owner: PropertyOwner
  images: Array<string>
  creatorID: any
  isActive: boolean,
  verificationState : 'Pending' | 'Verified' | 'Rejected'
}
