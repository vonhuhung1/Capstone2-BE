const cloudinary = require('cloudinary').v2;
const httpStatus = require('http-status');
const multer = require('multer');
const ApiError = require('../utils/ApiError');
const config = require('./config');

cloudinary.config(config.cloudinary_option);

const uploadCloud = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

const assignCloudinary = async (req, res, next) => {
  try {
    const { files } = req;
    const numberLimit = Object.keys(files).length;
    await Object.keys(files).map(async (key, indexKey) => {
      const urls = files[key].map(async (urlElement, index) => {
        const currentElement = await cloudinary.uploader.upload(urlElement.path);
        return { index: index + 1, path: currentElement.url };
      });
      const resolve = await Promise.all(urls);
      req.body[key] = resolve.length - 1 > 0 ? resolve : resolve[0].path;
      if (indexKey === numberLimit - 1) {
        next(); 
      }
    });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please choose image');
  }
};

module.exports = { uploadCloud, assignCloudinary };
