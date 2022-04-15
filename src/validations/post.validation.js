const Joi = require('joi');
const { objectId } = require('./custom.validation');

// to do fix validation field create
const createPost = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(50).required(),
    content: Joi.string().min(0).max(250).required(),
    status: Joi.boolean().required(),
    address: Joi.string().min(0).max(100).required(),
    authorId: Joi.string().custom(objectId).required(),
    comment: Joi.string().custom(objectId),
    image: Joi.string().min(0).max(150).required(),
    userId: Joi.string().min(0).max(150).required(),
    quantity: Joi.number().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    name: Joi.string(),
    populate: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().min(0).max(50),
      content: Joi.string().min(0).max(250),
      status: Joi.boolean(),
      address: Joi.string().min(0).max(100),
      authorId: Joi.string().custom(objectId),
      comment: Joi.string().custom(objectId),
      image: Joi.array(),
      userId: Joi.array(),
      quantity: Joi.number(),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
