const twilio = require("twilio");
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const createSMSLogFile = require("./tmp/smsServiceLog");

const sendSMS = async (message) => {
  const msg = {
    body: message,
    messagingServiceSid: process.env.SERVICE_ID,
    to: process.env.PHONE_NUM,
  };

  try {
    if (await createSMSLogFile(message)) {
      const res = await client.messages.create(msg);
      console.log(res.sid, "SMS sent");
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendSMS;
