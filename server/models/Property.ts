

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
    owner: {
        type: String,
        enum: ['eswift','affiliate']
    },
    photo:{
        type: String
    },
    affiliateId: {
        type: Schema.Types.ObjectId, //possibly a json string
        ref: 'user',
    },
    isActive:{
        type: Boolean,
        default: true,
    }
  },
  { timestamps: true }
)

export default mongoose.model('property', Property)
