const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGive = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(50).required(),
    content: Joi.string().min(0).max(250).required(),
    status: Joi.boolean().required(),
    address: Joi.string().min(0).max(100).required(),
    authorId: Joi.string().custom(objectId).required(),
    image: Joi.array().required(),
    giveList: Joi.string().custom(objectId).required(),
    startEvent: Joi.date().required(),
    endEvent: Joi.date().required(),
  }),
};

const getGives = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGive = {
  params: Joi.object().keys({
    giveId: Joi.string().custom(objectId),
  }),
};

const updateGive = {
  params: Joi.object().keys({
    giveId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().min(0).max(50),
      content: Joi.string().min(0).max(250),
      status: Joi.boolean(),
      address: Joi.string().min(0).max(100),
      authorId: Joi.string().custom(objectId),
      giveList: Joi.string().custom(objectId),
      image: Joi.array(),
      startEvent: Joi.date(),
      endEvent: Joi.date(),
    })
    .min(1),
};

const deleteGive = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createGive,
  getGives,
  getGive,
  updateGive,
  deleteGive,
};
