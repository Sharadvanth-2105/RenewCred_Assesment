const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const defaultAdmin = {
  _id: 'admin-default-id',
  username: 'Sanjay (Admin)',
  email: 'admin@renewcred.com',
  passwordHash: '$2a$10$wN9aL4j9b3Fm7yJqK2j.u.G.Q9N4K7O4S8Z3Y7W6V5U4T3S2R1Q0P',
  role: 'admin'
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'renewcred_super_secret_jwt_key_2026', {
    expiresIn: '7d'
  });
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const admin = await Admin.findOne({ email });
      if (admin && (await admin.matchPassword(password))) {
        return res.json({
          success: true,
          token: generateToken(admin._id),
          user: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role
          }
        });
      }
    } else {
      const inputEmail = email.toLowerCase().trim();
      const targetEmail = (process.env.ADMIN_EMAIL || defaultAdmin.email).toLowerCase().trim();
      const targetPass = process.env.ADMIN_PASSWORD || 'admin123';

      if (inputEmail === targetEmail && password === targetPass) {
        return res.json({
          success: true,
          token: generateToken(defaultAdmin._id),
          user: {
            id: defaultAdmin._id,
            username: defaultAdmin.username,
            email: defaultAdmin.email,
            role: defaultAdmin.role
          }
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const admin = await Admin.findById(req.admin.id).select('-password');
      if (admin) {
        return res.json({
          success: true,
          user: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role
          }
        });
      }
    }

    return res.json({
      success: true,
      user: {
        id: defaultAdmin._id,
        username: defaultAdmin.username,
        email: defaultAdmin.email,
        role: defaultAdmin.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  loginAdmin,
  getMe
};
