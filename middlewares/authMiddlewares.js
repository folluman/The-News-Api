const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require('dotenv').config;

exports.authenticate = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if(!token) {
    return res.status(401).json({ error: 'Acess denied'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch {
    res.status(401).json({ error: 'Invalid token. Requeres admin permission'});
  }
});

exports.isAdmin = asyncHandler(async(req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({error: 'Only admin can do this'});
  }
});