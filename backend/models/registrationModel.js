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
  },
  {
    timestamps: true,
  }
);

const SellerRegistration = mongoose.model('SellerRegistration', sellerRegistrationSchema);

export default SellerRegistration;
