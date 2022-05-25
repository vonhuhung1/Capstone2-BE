const express = require('express');
const auth = require('../../middlewares/auth');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router.route('/:params').get(auth('user'), postController.getPostByCategory);

module.exports = router;
