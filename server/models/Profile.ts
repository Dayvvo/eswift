import mongoose from "mongoose";

const Profile = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    officeAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    areYouAnExistingCustomer: { type: Boolean, required: true },
    howDidYouHearAboutUs: { type: String, required: true },
    modeOfIdentification: { type: String, required: true },
    idDocument: {
      type: String,
      required: true,
    },
    passport: { type: String, required: true },
    agentIdProof: { type: String, required: true },
    currentOccupation: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", Profile);
