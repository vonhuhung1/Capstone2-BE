const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(50).required(),
    content: Joi.string().min(0).max(250).required(),
    status: Joi.boolean().required(),
    address: Joi.string().min(0).max(100).required(),
    image: Joi.array().required(),
    authorId: Joi.string().custom(objectId).required(),
    startEvent: Joi.date().required(),
    endEvent: Joi.date().required(),
    quantity: Joi.number().required(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    eventId: Joi.required().custom(objectId),
  }),
  query: Joi.object().keys({
    imageIndex: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().min(0).max(50),
      content: Joi.string().min(0).max(250),
      status: Joi.boolean(),
      address: Joi.string().min(0).max(100),
      authorId: Joi.string().custom(objectId),
      image: Joi.array(),
      startEvent: Joi.date(),
      endEvent: Joi.date(),
      quantity: Joi.number(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
