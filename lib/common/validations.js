module.exports.nameValidation = (name) => {
  return name.trim().length > 0 && name.length < 50;
};

module.exports.courseNameValidation = (name) => {
  return name.trim().length > 0 && name.length < 200;
};

module.exports.emailValidation = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports.passwordValidation = (password) => {
  return password == null || password.trim() == "" || password.length > 4;
};

module.exports.roleValidation = (role) => {
  return (
    role !== null && role !== undefined && ["ADMIN", "USER"].includes(role)
  );
};

module.exports.isNumber = (n) => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};

module.exports.isValidURL = (string) => {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};
