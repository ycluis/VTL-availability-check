const { constants } = require("fs");
const { access } = require("fs/promises");
const path = require("path");

const checkIfLogExist = async (filePath, fileName) => {
  try {
    await access(path.join(__dirname, filePath, fileName), constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = checkIfLogExist;
