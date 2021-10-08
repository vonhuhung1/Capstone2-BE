const express = require('express');
const ejs = require('ejs');
const { systemPath } = require('../../utils/systemPath');

const router = express.Router();

router.get('/', async (req, res) => {
  const html = await ejs.renderFile(
    `${__dirname.split(systemPath('/routes/publicRoute')).join('')}${systemPath('/template/welcome/hello.ejs')}`
  );
  res.send(html);
});

module.exports = router;
