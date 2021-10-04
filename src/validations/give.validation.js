const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGive = {
  body: Joi.object().keys({
    authorId: Joi.string().custom(objectId).required(),
    status: Joi.boolean().required(),
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
      authorId: Joi.string().custom(objectId).required(),
      status: Joi.boolean().required(),
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
