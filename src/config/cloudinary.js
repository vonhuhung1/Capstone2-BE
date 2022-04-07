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
  return files[key].map(
    async (urlElement) => await cloudinary.uploader.upload(urlElement.path)  
  );
}

const assignCloudinary = async ( req, res, next) => {
  const { files, body, method } = req;
  const maxKey = Object.keys(files).length;
  try { 
      maxKey > 0 && method === 'POST' && Object.keys(files).map(
        async (key, index) => {
          const result = await Promise.all(getUrls(files, key));
          req.body = { ...body, [key]: result[index].url};
          index === maxKey - 1 && next();
        }
      )
  } catch {
    res.status(httpStatus.UNAUTHORIZED).send({
      code: httpStatus.UNAUTHORIZED,
      message: 'Please choose image jpe|jpeg|png|gif',
    });
  }
};

module.exports = { uploadCloud, assignCloudinary };
