const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a post 
 * @param {Object} userBody;
 * @returns {Promise<User>}
 */
const createPost = async (userBody) => {
    return Post.create(userBody);
}

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryPost = async (filter,options) => {
    const posts = await Post.paginate(filter,options);
    return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getPostById = async (id) => {
    return Post.findById(id).populate('authorId');
  };
  
/**
* Update post by id
* @param {ObjectId} userId
* @param {Object} updateBody
* @returns {Promise<User>}
 */
const updatePostById = async (postId, updateBody) => {
    const post = await getPostById(postId);
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    Object.assign(post, updateBody);
    return post.save();
  };
  
/**
* Delete post by id
* @param {ObjectId} userId
* @returns {Promise<User>}
 */
const deletePostById = async (userId) => {
    const post = await getPostById(userId);
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    return post.remove();
  };
  

module.exports = {
    createPost,
    queryPost,
    getPostById,
    updatePostById,
    deletePostById,
};

