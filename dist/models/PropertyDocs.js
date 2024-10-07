import mongoose, { Schema } from 'mongoose';
import { PropertyDocuments } from '../utils/interfaces/types';
const PropertyDocs = new mongoose.Schema({
    name: {
        type: String,
        enum: Object.values(PropertyDocuments),
    },
    property: {
        type: Schema.Types.ObjectId, //possibly a json string
        ref: 'property',
    },
    state: {
        type: String,
        default: 'blank'
    },
    file: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId, //possibly a json string
        ref: 'user',
    },
}, { timestamps: true });
export default mongoose.model('propertydocs', PropertyDocs);
