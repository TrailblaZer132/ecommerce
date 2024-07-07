import asyncHandler from "express-async-handler";
import SellerRegistration from "../models/registrationModel.js";
import User from "../models/userModel.js";

const registerSeller = asyncHandler(async (req, res) => {
  const { email, name, address, pincode, phoneNumber, companyName } = req.body;

  const sellerExists = await SellerRegistration.findOne({ email });

  if (sellerExists) {
    res.status(400);
    throw new Error("Seller already exists");
  }

  const aadhaarPath = req.files.aadhaar
    ? `/${req.files.aadhaar[0].path}`
    : null;
  const panPath = req.files.pan ? `/${req.files.pan[0].path}` : null;

  const seller = await SellerRegistration.create({
    email,

    name,
    address,
    pincode,
    phoneNumber,
    companyName,
    aadhaar: aadhaarPath,
    pan: panPath,
  });

  if (seller) {
    res.status(201).json({
      _id: seller._id,

      email: seller.email,
      name: seller.name,
      address: seller.address,
      pincode: seller.pincode,
      phoneNumber: seller.phoneNumber,
      companyName: seller.companyName,
      aadhaar: seller.aadhaar,
      pan: seller.pan,
    });
  } else {
    res.status(400);
    throw new Error("Invalid seller data");
  }
});

const checkSellerRegistration = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const seller = await SellerRegistration.findOne({ email });

    if (seller) {
      return res.json({ applied: true });
    } else {
      return res.json({ applied: false });
    }
  } catch (error) {
    console.error("Error checking seller registration:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// backend/controllers/sellerRegistrationController.js

const acceptSeller = async (req, res) => {
  try {
    const { userId } = req.body; // This is the ID of the SellerRegistration document
    const adminId = req.user._id;

    // Find the SellerRegistration document to get the email
    const sellerRegistration = await SellerRegistration.findById(userId);
    if (!sellerRegistration) {
      return res.status(404).send({ message: "Seller registration not found" });
    }

    // Use the email to find the original User document
    const user = await User.findOne({ email: sellerRegistration.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update the SellerRegistration document with the admin ID and the original user's ID
    const seller = await SellerRegistration.findByIdAndUpdate(
      userId,
      {
        acceptedByAdmin: adminId,
        userIdWhoGotAccepted: user._id, // Use the original user's ID
      },
      { new: true }
    );

    if (!seller) {
      return res.status(404).send({ message: "Seller not found" });
    }

    res.status(200).send(seller);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { registerSeller, checkSellerRegistration, acceptSeller };
