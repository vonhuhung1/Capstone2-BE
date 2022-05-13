/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
const CronJob = require('../models/cronjob.model');

const web = 'https://tuoitre.vn';

const Promise2 = async (arr) => {
  arr.forEach(async (element, index) => {
    let obj = {};
    const res = await axios.get(`${web}${element.href}`);
    const $ = cheerio.load(res.data);
    $('.main-content-body #main-detail-body').each((i, e) => {
      const content = $(e).find('#main-detail-body p').text();
      obj = { ...element, ...obj, content };
    });
    $('.VCSortableInPreviewMode a img').each((i, e) => {
      const image = $(e).attr('src');
      obj = { ...element, ...obj, image };
    });
    console.log(obj);
    CronJob.create(obj);
  });
};

const Promise1 = () => {
  axios
    .get(web)
    .then((res) => {
      const result = [];
      const $ = cheerio.load(res.data);
      $('.scroll-pane li h2 a').each((i, e) => {
        result.push({ href: $(e).attr('href') });
      });
      $('.scroll-pane .title-name').each((i, e) => {
        result[i] = { title: $(e).text().replace(/\s\s+/g, ''), ...result[i] };
      });
      Promise2(result);
    })
    .catch((err) => console.log(err));
};

module.exports = () => {
  const context = Promise1();
};
