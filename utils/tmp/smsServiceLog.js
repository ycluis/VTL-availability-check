const { writeFile } = require('fs/promises')
const path = require('path')
const checkIfLogExist = require('../fileExistenceCheck')

const createSMSLogFile = async (message) => {
  if (!(await checkIfLogExist('/tmp', process.env.SMS_LOG))) {
    await writeFile(path.join(__dirname, '/', process.env.SMS_LOG), message)
    console.log('SMS log file created')
    return true
  } else {
    return false
  }
}

module.exports = createSMSLogFile
