const Blog = require("../models/blogsModel");
const joi = require("joi");
const jwt = require("jsonwebtoken");

exports.postblog = async (req, res) => {
  const blogSchema = joi.object({
    title: joi.string().required(),
    body: joi.string().required(),
    author: joi.string().required(),
  });

  try {
    let blogfields = await blogSchema.validateAsync(req.body);
    blog = new Blog(blogfields);
    await blog.save();
    res.status(200).json({
      message: "blog posted successfully",
      blogData: blog,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: err,
    });
  }
};

exports.getblogs = (req, res) => {
  Blog.find({})
    .then((blogs) => {
      if (blogs) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(blogs);
      } else {
        res.json({
          msg: "No blogs found",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
