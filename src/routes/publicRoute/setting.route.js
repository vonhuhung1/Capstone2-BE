const express = require('express');
const ejs = require('ejs');

const router = express.Router();

router.get('/', async (req, res) => {
  const html = await ejs.renderFile(`${__dirname.split('/routes/publicRoute').join('')}/template/welcome/hello.ejs`);
  res.send(html);
});

module.exports = router;
