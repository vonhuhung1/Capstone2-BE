const os = require('os');

module.exports.systemPath = (path) => {
  const flag = os.type() === 'Windows_NT';
  return flag ? path.replace(new RegExp('/', 'g'), `\\`) : path;
};
