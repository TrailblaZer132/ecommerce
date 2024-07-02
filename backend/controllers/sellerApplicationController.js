
import asyncHandler from 'express-async-handler';
import SellerRegistration from '../models/registrationModel.js';
import User from '../models/userModel.js'; // Assuming you have a User model

const getAllSellerApplications = asyncHandler(async (req, res) => {
  const sellers = await SellerRegistration.find({});
  res.json(sellers);
});

const toggleSellerStatus = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }
  
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  user.isSeller = !user.isSeller;
  await user.save();
  
  res.json({ message: 'Seller status updated', isSeller: user.isSeller });
});

export { getAllSellerApplications, toggleSellerStatus };


