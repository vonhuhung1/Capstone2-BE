const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    content: Joi.string().min(0).max(250).required(),
    authorId: Joi.string().custom(objectId).require(),
    replyId: Joi.string().custom(objectId).require(),
  }),
};

const getComments = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getComment = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().min(0).max(250).required(),
      authorId: Joi.string().custom(objectId).require(),
      replyId: Joi.string().custom(objectId).require(),
    })
    .min(1),
};

const deleteComment = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};
