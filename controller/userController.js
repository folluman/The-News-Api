const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config;
const { generateToken } = require('../authentication/auth');

// Display list Users
exports.user_create_list = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();

  res.json(users);
});

// Create User
exports.user_create_post = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Username must be specified.')
    .isAlphanumeric()
    .withMessage('Username has non-alphanumeric characters.'),
  body('email')
    .trim()
    .isLength({ min: 11 })
    .escape()
    .withMessage('Email name must be specified')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('Please insert a validate e-mail'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage('Password must be specified'),
  body('phone')
    .trim()
    .isInt()
    .isLength({ max: 15 })
    .escape()
    .withMessage('Phone must be specified'),

  // Process request after validation and sanitization
  asyncHandler(async(req, res, next) => {
    const username = await User.findOne({ username: req.body.username }).exec();
    const email = await User.findOne({ email: req.body.email }).exec();
    const phone = await User.findOne({ phone: req.body.phone }).exec();

    if (username) {
      return res.status(400).json({ error: 'Username already exists!' });
    }
    if(email) {
      return res.status(400).json({ error: 'E-mail already exists!' });
    }
    if(phone) {
      return res.status(400).json({ error: 'Phone already exists!' });
    }

    const errors = validationResult(req);

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User ({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
      phone: parseInt(req.body.phone),
    });

    if(!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    await user.save();

    res.status(200).json({ message: 'User created successfully!' });
  }
  )  
];

// Delete User
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();

  if(user) {
    await User.findByIdAndDelete(req.params.id).exec();
    res.send('Deleted User');
    return;
  }
  res.send('User was not found');
});

// Login User
exports.user_login_post = asyncHandler(async(req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if(!user) {
      return res.status(401).json({ error: 'Email or password invalid!'});
    }

    // Compare hasheds passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(401).json('Password invalid!');
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update User
exports.user_update_post = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Username must be specified.')
    .isAlphanumeric()
    .withMessage('Username has non-alphanumeric characters.'),
  body('email')
    .trim()
    .isLength({ min: 11 })
    .escape()
    .withMessage('Email name must be specified')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('Please insert a validate e-mail'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage('Password must be specified'),
  body('phone')
    .trim()
    .isInt()
    .isLength({ max: 15 })
    .escape()
    .withMessage('Phone must be specified'),

  // Process request after validation and sanitization
  asyncHandler(async(req, res, next) => {
    const username = await User.findOne({ username: req.body.username }).exec();
    const email = await User.findOne({ email: req.body.email }).exec();
    const phone = await User.findOne({ phone: req.body.phone }).exec();

    // Verify if datas already exist
    if (username) {
      return res.status(400).json({ error: 'Username already exists!' });
    }
    if(email) {
      return res.status(400).json({ error: 'E-mail already exists!' });
    }
    if(phone) {
      return res.status(400).json({ error: 'Phone already exists!' });
    }
    
    const errors = validationResult(req);

    // transforms the password into a hash
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // save user as Object
    const user = new User ({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      _id: req.params.id,
    });

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // update user
    await User.findByIdAndUpdate(req.params.id, user, {});

    res.send('Data uploaded');
  }
  )
];
