const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(50).required(),
    content: Joi.string().min(0).max(250).required(),
    status: Joi.boolean().required(),
    address: Joi.string().min(0).max(100).required(),
    authorId: Joi.string().custom(objectId).require(),
    comment: Joi.string().custom(objectId).require(),
    giveList: Joi.string().custom(objectId).require(),
    startEvent: Joi.date().required(),
    endEvent: Joi.date().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().min(0).max(50).required(),
      content: Joi.string().min(0).max(250).required(),
      status: Joi.boolean().required(),
      address: Joi.string().min(0).max(100).required(),
      authorId: Joi.string().custom(objectId).require(),
      giveList: Joi.string().custom(objectId).require().message({
        'string.empty': 'Id in table give not exist',
      }),
      startEvent: Joi.date().required(),
      endEvent: Joi.date().required(),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
