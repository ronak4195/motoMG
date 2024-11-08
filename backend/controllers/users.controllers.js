import Users from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); 

const saltRounds = 10; 

const cart = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ success: false, errors: "User ID is required" });
  }

  try {
    const user = await Users.findById(userId).populate("cartData.product");
    if (!user) {
      return res.status(404).json({ success: false, errors: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new Users({
      userID: new mongoose.Types.ObjectId().toString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      vehicle: req.body.vehicle,
      cartData: [],
      city: req.body.city,
      state: req.body.state,
      address1: req.body.address1,
      address2: req.body.address2,
      pincode: req.body.pincode,
    });

    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET); 
    const username = user.name;
    const userId = user.id;
    res.json({ success: true, token, username, userId, user });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, errors: "Invalid email or password" });
    }

    const passCompare = await bcrypt.compare(req.body.password, user.password); // Compare the hashed passwords
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET); 
      const username = user.name;
      const userId = user.id;
      res.json({ success: true, token, username, userId, user });
    } else {
      res.status(400).json({ success: false, errors: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const updateCart = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user.user.id;
    const { cartData } = req.body;

    try {
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { cartData },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({
        success: true,
        message: "Cart data updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating cart data:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
];

export default {
  cart,
  signup,
  login,
  updateCart,
};
