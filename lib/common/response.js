module.exports.success = (message) => {
  return {
    errors: [],
    message,
  };
};

module.exports.failure = (errors, message) => {
  return {
    errors,
    message,
  };
};

module.exports.invalidParameters = (errors) => {
  return module.exports.failure(errors, "Invalid parameters provided!");
};

module.exports.serverError = (errors) => {
  return module.exports.failure(errors, "An internal server error occurred");
};

module.exports.operationSuccessful = (data) => {
  return { ...module.exports.success("Success!"), data };
};
