// userController.js
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import SellerRegistration from "../models/registrationModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from 'jsonwebtoken';



let userOTPStore = {};  // Temporary storage for user OTPs

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill in all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate OTP
  const otp = crypto.randomBytes(2).toString('hex');

  // Use Nodemailer to send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification OTP',
    html: `<h2>Email Verification</h2>
           <p>Your OTP for verification is: <strong>${otp}</strong></p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email: ', err);
      res.status(500).send("Error sending verification email");
      return;
    }

    // Temporarily store user details and OTP
    userOTPStore[email] = { username, hashedPassword, otp, createdAt: Date.now() };
    
    console.log('Email sent: ', info.response);
    res.status(200).json({
      message: 'OTP sent to your email. Please verify your OTP.'
    });
  });
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const userData = userOTPStore[email];

  if (!userData) {
    return res.status(400).send('Invalid OTP or email.');
  }

  const { username, hashedPassword, otp: storedOtp, createdAt } = userData;

  // Check if OTP is correct and not expired (5 minutes expiry)
  const isOTPValid = storedOtp === otp && (Date.now() - createdAt) < 300000;

  if (!isOTPValid) {
    return res.status(400).send('Invalid or expired OTP.');
  }

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  // Remove user from OTP store after successful verification
  delete userOTPStore[email];

  res.status(201).json({
    message: 'User registered successfully and verified.',
  });
});


const verifyEmail = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send('Invalid token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).send('Invalid token');
    }

    user.isVerified = true;
    await user.save();

    res.send('Email verified successfully');
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser ) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        isSeller: existingUser.isSeller,
        isSuperAdmin: existingUser.isSuperAdmin,
        isChatSupport: existingUser.isChatSupport,
        pincode: existingUser.pincode,
      });
      return;
    }
  }

  res.status(401).send("Invalid email or password, or email not verified");
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = async (req, res) => {
  if (req.user && req.user.isSuperAdmin) {
    try {
      // Fetch and return all admin users for super admins
      const admins = await User.find({ isAdmin: true });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else if (req.user && req.user.isAdmin) {
    try {
      // Fetch and return all seller users for admins
      const sellers = await User.find({ isSeller: true });
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(401).send("Not authorized");
  }
};

const getAllPincodes = asyncHandler(async (req, res) => {
  const pincodes = await User.distinct("pincode");
  res.json(pincodes);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    //update admin here
    // user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//ADMIN CONTROLLER
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin && user.isSuperAdmin) {
      res.status(400);
      throw new Error("Cannot delete Admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Superadmin
const registerAdmin = asyncHandler(async (req, res) => {
  if (!req.user.isSuperAdmin) {
    res.status(403);
    throw new Error("Not authorized as super admin");
  }

  const { username, email, password, pincode } = req.body;
  if (!username || !email || !password || !pincode) {
    throw new Error("Please fill in all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin: true,
    pincode,
  });

  try {
    await newUser.save();
    // createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      pincode: newUser.pincode,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteAdminAndResetSellers = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await User.findOne({ _id: adminId, isAdmin: true });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Find SellerRegistrations with the same pincode
    const sellerRegistrations = await SellerRegistration.find({
      pincode: admin.pincode,
    });

    // Extract userIdsWhoGotAccepted from those registrations
    const userIds = sellerRegistrations.map(
      (registration) => registration.userIdWhoGotAccepted
    );

    // Set isSeller to false for users who got accepted under this admin
    await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isSeller: false } }
    );

    // Delete SellerRegistration documents for sellers under the same pincode
    await SellerRegistration.deleteMany({ pincode: admin.pincode });

    // Delete the admin user
    await User.deleteOne({ _id: adminId });

    res
      .status(200)
      .json({ message: "Admin and related sellers reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllAdmins = asyncHandler(async (req, res) => {
  if (req.user && req.user.isSuperAdmin) {
    try {
      const admins = await User.find({ isAdmin: true });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else if (req.user && req.user.isAdmin) {
    try {
      // Fetch and return non-admin users
      const users = await User.find({ isAdmin: false });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(401).send("Not authorized");
  }
});


const registerChatSupport = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill in all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    isChatSupport: true,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isChatSupport: user.isChatSupport,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  registerAdmin,
  getAllPincodes,
  deleteAdminAndResetSellers,
  getAllAdmins,
  verifyOTP,
  verifyEmail,
  registerChatSupport,
};











