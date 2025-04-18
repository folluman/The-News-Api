const Admin = require('../models/admin');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.admin_create_post =[
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

  asyncHandler(async(req, res, next) => {
    const username = await Admin.findOne({ username: req.body.username }).exec();
    const email = await Admin.findOne({ email: req.body.email }).exec();
    
    if (username) {
      return res.status(400).json({ error: 'Username already exists!' });
    }
    if(email) {
      return res.status(400).json({ error: 'E-mail already exists!' });
    }

    const errors = validationResult(req);
    
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
    const admin = new Admin ({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    
    if(!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }
    
    await admin.save();
    
    res.status(200).json({ message: 'Admin created successfully!' });
  }
  )  
];
