const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');
const { uploadCloud, assignCloudinary } = require('../../config/cloudinary');

const router = express.Router();

router
  .route('/')
  .post(
    uploadCloud.fields([{ name: 'image', maxCount: 5 }]),
    assignCloudinary,
    validate(postValidation.createPost),
    postController.createPost
  )
  .get(validate(postValidation.getPosts), postController.getPosts);

router
  .route('/:postId')
  .get(auth('user'), validate(postValidation.getPost), postController.getPost)
  .patch(
    auth('user'),
    uploadCloud.fields([{ name: 'image', maxCount: 5 }]),
    assignCloudinary,
    validate(postValidation.updatePost),
    postController.updatePost
  )
  .delete(auth('user'), validate(postValidation.deletePost), postController.deletePost);

module.exports = router;
