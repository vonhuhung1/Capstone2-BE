const cloudinary = require('cloudinary').v2;
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
  const { files } = req;
  const indexElement = [];
  const urls = Object.values(files).map((element) => {
    return indexElement.push(element[0].fieldname) && cloudinary.uploader.upload(element[0].path);
  });
  const resolve = await Promise.all(urls);
  resolve.forEach((element, index) => {
    req.body = { ...req.body, [indexElement[index]]: element.url };
  });
  next();
};

module.exports = { uploadCloud, assignCloudinary };
