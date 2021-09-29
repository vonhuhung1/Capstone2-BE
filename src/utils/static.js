const generatorMessage = ({ field, type, min, max }) => {
  return {
    'string.base': `"${field}" should be a type of '${type}`,
    'string.empty': `"${field}" cannot be an empty field`,
    'string.min': `"${field}" should have a minimum length of ${min}`,
    'string.max': `"${field}" should have a maximum length of ${max}`,
    'any.required': `"${field}" is a required field`,
  };
};

module.exports = {
  generatorMessage,
};
