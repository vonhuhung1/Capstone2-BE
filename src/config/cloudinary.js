const cloudinary = require('cloudinary').v2;
const httpStatus = require('http-status');
const multer = require('multer');
const config = require('./config');

cloudinary.config(config.cloudinary_option);

const uploadCloud = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|jpg|gif$i/)) {
      cb(new Error('File is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

const getUrls = (files, key) => {
  // eslint-disable-next-line no-return-await
  return files[key].map(async (urlElement) => await cloudinary.uploader.upload(urlElement.path));
};

const assignCloudinary = async (req, res, next) => {
  let flag = 0;
  const { files, method } = req;
  const maxKey = Object.keys(files).length;
  try {
    if (maxKey > 0 && method === 'POST') {
      Object.keys(files).forEach(async (key) => {
        const result = await Promise.all(getUrls(files, key));
        req.body[key] = result[0].url;
        // eslint-disable-next-line no-unused-expressions
        flag === maxKey - 1 && next();
        // eslint-disable-next-line no-plusplus
        ++flag;
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).send({
      code: httpStatus.UNAUTHORIZED,
      message: 'Please choose image jpe|jpeg|png|gif',
    });
  }
};

module.exports = { uploadCloud, assignCloudinary };
