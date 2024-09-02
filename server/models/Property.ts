

import mongoose, { Schema } from 'mongoose'




const Property = new mongoose.Schema({
    state:{
        type:String,
    },
    lga:{
        type:String
    },
    address: {
      type: String, //possibly a json string
      ref: 'property',
    },
    photo:{
        type: String
    },
    affiliateId: {
        type: Schema.Types.ObjectId, //possibly a json string
        ref: 'user',
    },
    areaInSqm:{
        type: Number,
    },
    description:{
        type: String,
    },
    keyFeatures:{
        type: [String],
    },
    ownership:{
        type: String,
        enum: ['private','commercial']
    },
    propertyType:{
        type: String,
        enum: ['land','building']
    },
    category:{
        type: String,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model('property', Property);
