import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const sellerRegistrationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    aadhaar: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      required: true,
    },
    acceptedByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is the model name for admins
      required: false, // This field is optional until a seller is accepted
    },
  },
  {
    timestamps: true,
  }
);

const SellerRegistration = mongoose.model(
  "SellerRegistration",
  sellerRegistrationSchema
);

export default SellerRegistration;
