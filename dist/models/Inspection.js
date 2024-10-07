import { Schema, model } from "mongoose";
const InspectionSchema = new Schema({
    first_name: {
        type: String,
        require: [true, "Please enter your first name"],
    },
    last_name: {
        type: String,
        require: [true, "Please enter your last name"],
    },
    email: {
        type: String,
        require: [true, "Please enter your email"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: "property",
    },
}, { timestamps: true });
export default model("inspection", InspectionSchema);
