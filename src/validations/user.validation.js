const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    fistName: Joi.string().min(0).max(25).required(),
    lastName: Joi.string().min(0).max(25).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(0).max(150).required().custom(password),
    typeId: Joi.string().custom(objectId),
    lat: Joi.string().min(0).max(150),
    lng: Joi.string().min(0).max(150),
    location: Joi.string().min(0).max(150),
    phoneNumber: Joi.string().min(0).max(15).required(),
    frontCard: Joi.string().min(0).max(150).required(),
    backCard: Joi.string().min(0).max(150).required(),
    avatar: Joi.string().min(0).max(150).required(),
    agree: Joi.boolean().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    fistName: Joi.string(),
    location: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      fistName: Joi.string().min(0).max(25),
      lastName: Joi.string().min(0).max(25),
      email: Joi.string().email(),
      password: Joi.string().min(0).max(150).custom(password),
      typeId: Joi.string().custom(objectId),
      lat: Joi.string().min(0).max(150),
      lng: Joi.string().min(0).max(150),
      location: Joi.string().min(0).max(150),
      phoneNumber: Joi.string().min(0).max(15),
      frontCard: Joi.string().min(0).max(150),
      backCard: Joi.string().min(0).max(150),
      avatar: Joi.string().min(0).max(150),
      agree: Joi.boolean(),
      role: Joi.string().valid('user', 'admin'),
      classify: Joi.string().valid('Giver', 'Receiver'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const LocationRadius = {
  params: Joi.object().keys({
    lat: Joi.string(),
    lng: Joi.string(),
    radius: Joi.string(),
    location: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  LocationRadius,
};
