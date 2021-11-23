/* eslint-disable no-unused-expressions */
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      key.length > 0 && key !== ' '
        ? // eslint-disable-next-line no-param-reassign
          (obj[key] = { $gte: object[key] - object.radius / 6371, $lt: +object[key] + +object.radius / 6371 })
        : {};
    }
    return obj;
  }, {});
};

module.exports = pick;
