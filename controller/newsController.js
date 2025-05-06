const News = require('../models/news');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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

  asyncHandler(async(req, res, next) => {
    const title = await News.findOne({ title: req.body.title }).exec();

    const errors = validationResult(req);

    if (title) {
      return res.status(400).json({error: 'Title already exists! Choose another title for this news'});
    }

    const news = new News({
      title: req.body.title,
      content: req.body.content,
    });

    if(!errors.isEmpty){
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    await news.save();

    res.status(200).json({ message: 'News created sucessfully'});
  })
];