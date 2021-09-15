const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    fistName: Joi.string().min(0).max(25).required(),
    lastName: Joi.string().min(0).max(25).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(0).max(150).required().custom(password),
    typeId: Joi.string().custom(objectId),
    location: Joi.string().min(0).max(150),
    phoneNumber: Joi.string().min(0).max(15).required(),
    frontCard: Joi.string().min(0).max(150).required(),
    backCard: Joi.string().min(0).max(150).required(),
    agree: Joi.boolean().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
