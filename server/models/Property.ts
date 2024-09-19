import mongoose, { Schema } from 'mongoose'
import { PropertyDocuments } from '../utils/types'
import { IProperty, PropertyOwner } from '../utils/interfaces'

const PropertySchema = new mongoose.Schema<IProperty>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
    },
    address: {
      type: String,
    },
    features: {
      type: [String],
    },
    owner: {
      type: String,
      enum: PropertyOwner,
      default: PropertyOwner.ESWIFT,
    },
    price: {
      type: String,
    },
    images: {
      type: [String],
    },
    affiliateId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verificationState: {
      type: String,
      enum: Object.values(PropertyDocuments),
    },
  },
  { timestamps: true }
)

const Property = mongoose.model('property', PropertySchema)

export default Property
