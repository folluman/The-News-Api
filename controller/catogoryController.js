const Category = require('../models/category');
const assyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.category_create = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Category must be specified.'),

  assyncHandler(async(req, res, next) => {
    const categoryName = await Category.findOne({ category: req.body.category }).exec();

    if(categoryName) {
      return res.status(400).json({error: 'Category already exist'});
    }

    const errors = validationResult(req);

    const category = new Category ({
      name: req.body.name,
    });

    if(!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    await category.save();

    res.status(200).json({ message: 'Category created successfully!'});
  })
];