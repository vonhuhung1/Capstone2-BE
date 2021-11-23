const cloudinary = require('cloudinary').v2;
const httpStatus = require('http-status');
const multer = require('multer');
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
    const { files, body } = req;
    const numberFiles = Object.keys(body).length + Object.keys(files).length;
    if (numberFiles > 0) {
      Object.keys(files).map(async (key) => {
        const urls = files[key].map(async (urlElement, index) => {
          const currentElement = await cloudinary.uploader.upload(urlElement.path);
          return { index: index + 1, path: currentElement.url };
        });
        const result = await Promise.all(urls);
        req.body = { ...req.body, [key]: result.length === 1 ? result[0].path : result };
        if (numberFiles === Object.keys(req.body).length) {
          next();
        }
      });
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        code: httpStatus.BAD_REQUEST,
        message: 'File is empty(min a field)',
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).send({
      code: httpStatus.UNAUTHORIZED,
      message: 'Please choose image jpe|jpeg|png|gif',
    });
  }
};

module.exports = { uploadCloud, assignCloudinary };
