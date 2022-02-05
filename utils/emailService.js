const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendMail = async (subject, html) => {
  const msg = {
    to: process.env.MAIL_RECEIVER,
    from: process.env.MAIL_SENDER,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendMail;
