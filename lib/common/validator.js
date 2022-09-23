module.exports = (validationFunction, name, error) => {
  return validationFunction ? true : `${name} is invalid : ${error}`;
};
