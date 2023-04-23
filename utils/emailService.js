const fs = require('fs')
const path = require('path')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendMail = async (subject, html, message, withAttachment) => {
  const msg = {
    to: process.env.MAIL_RECEIVER,
    // to: [],
    from: process.env.MAIL_SENDER,
    subject,
    html,
  }

  if (withAttachment) {
    const attachment = fs.readFileSync(path.join(__dirname, '../', process.env.ERROR_LOG)).toString('base64')
    msg.attachments = [
      {
        content: attachment,
        filename: process.env.ERROR_LOG,
        type: 'text/txt',
        disposition: 'attachment',
      },
    ]
  }

  try {
    await sgMail.send(msg)
    // await sgMail.sendMultiple(msg);
    if (!withAttachment) {
      console.log(message, 'Seat available, check email')
    } else {
      console.log('Check email attachment for error log')
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = sendMail
