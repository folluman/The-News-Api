const News = require('../models/news');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');

exports.news_create_list = asyncHandler(async(req, res, next) => {
  const news = await News.find().exec();

  res.json(news);
});

exports.news_create_post = [
  body('title')
    .isLength({min: 1})
    .escape()
    .withMessage('Title must be specified'),
  body('content')
    .isLength({min: 1})
    .withMessage('Add content news'),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {  // Corrigido: errors.isEmpty() é uma função
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const titleExists = await News.findOne({ title: req.body.title }).exec();
    if (titleExists) {
      return res.status(400).json({error: 'Title already exists!'});
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const filePath = path.join(__dirname, '../uploads', req.file.filename);
      const fileData = await fs.readFile(filePath);
      const base64Image = `data:${req.file.mimetype};base64,${fileData.toString('base64')}`;

      const news = new News({
        src: base64Image,
        title: req.body.title,
        content: req.body.content,
      });

      await news.save();
      
      await fs.unlink(filePath);

      res.status(201).json({ 
        message: 'News created successfully!',
        news: news
      });

    } catch (err) {
      console.error('Error processing image:', err);
      res.status(500).json({ error: 'Error processing image' });
    }
  })
];