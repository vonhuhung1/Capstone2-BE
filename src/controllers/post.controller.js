const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  const Post = await postService.createPost(req.body);
  res.status(httpStatus.CREATED).send(Post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryPost(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getPostByCategory = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['category', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.getPostByCategory(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.status(httpStatus.OK).send(post);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePostById(req.params.postId, req.body);
  res.status(httpStatus.OK).send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getPostByCategory,
};
