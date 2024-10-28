import mongoose, { Schema } from "mongoose";
import { PropertyVerification } from "../utils/interfaces/types";
import { IProperty, PropertyOwner } from "../utils/interfaces";

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
    duration: {
      type: String,
    },
    creatorID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verification: {
      type: String,
      enum: Object.values(PropertyVerification),
      default: "pending",
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("property", PropertySchema);

export default Property;


