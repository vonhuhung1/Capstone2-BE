const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReplyComment = {
  body: Joi.object().keys({
    content: Joi.string().min(0).max(250).required(),
    authorId: Joi.string().custom(objectId).required(),
    replyId: Joi.string().custom(objectId).required(),
  }),
};

const getReplyComments = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReplyComment = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const updateReplyComment = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().min(0).max(250).required(),
      address: Joi.string().min(0).max(100).required(),
      authorId: Joi.string().custom(objectId).required(),
      replyId: Joi.string().custom(objectId).required(),
    })
    .min(1),
};

const deleteReplyComment = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReplyComment,
  getReplyComments,
  getReplyComment,
  updateReplyComment,
  deleteReplyComment,
};
