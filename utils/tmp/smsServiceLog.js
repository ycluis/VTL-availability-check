const { constants } = require("fs");
const { access, writeFile } = require("fs/promises");
const path = require("path");

const checkIfLogExist = async () => {
  try {
    await access(path.join(__dirname, "/", "sms_history.log"), constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const createSMSLogFile = async (message) => {
  if (!(await checkIfLogExist())) {
    await writeFile(path.join(__dirname, "/", "sms_history.log"), message);
    console.log("SMS log file created");
    return true;
  } else {
    return false;
  }
};

module.exports = createSMSLogFile;
