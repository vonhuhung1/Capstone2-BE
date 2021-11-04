const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
// const { uploadCloud, assignCloudinary } = require('../../config/cloudinary');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(
  '/register',
  // uploadCloud.fields([
  //   { name: 'frontCard', maxCount: 1 },
  //   { name: 'backCard', maxCount: 1 },
  // ]),
  // assignCloudinary,
  validate(authValidation.register),
  authController.register
);
router.post('/login', validate(authValidation.login), authController.login);
// router.post('/login-google', validate(authValidation.login), authController.loginGoogle);
// router.post('/login-meta', validate(authValidation.login), authController.loginMeta);
// router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', validate(authValidation.sendVerifyEmail), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;
