const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendMail = async (subject, html, message) => {
  const msg = {
    to: process.env.MAIL_RECEIVER,
    // to: [],
    from: process.env.MAIL_SENDER,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    // await sgMail.sendMultiple(msg);
    console.log(message, "Seat available, check Email");
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendMail;
