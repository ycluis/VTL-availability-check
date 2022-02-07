// load .env
require("dotenv").config();

const axios = require("axios");
const { parse } = require("node-html-parser");
const seatCheck = require("./utils/availabilityCheck");
const convertToHTML = require("./utils/formatMailBody");
const sendMail = require("./utils/emailService");

(async () => {
  try {
    const data = {};
    const sgToMyDateList = [];
    const myToSgDateList = [];
    let departureOption1 = "";
    let departureOption2 = "";

    const response = await axios.get(process.env.TRANSTAR_URL);
    const root = parse(response.data);

    const lastUpdated = root.querySelector("h4");
    const items = root.querySelectorAll("tr");

    items.forEach((item, index) => {
      if (index === 0) {
        departureOption1 = item.childNodes[1].childNodes[0]._rawText;
        departureOption2 = item.childNodes[2].childNodes[0]._rawText;
        data["lastUpdated"] = lastUpdated.structuredText;
      }

      if (index !== 0) {
        sgToMyDateList.push({
          [item.firstChild.childNodes[0]._rawText]:
            item.childNodes[1].childNodes[0]._rawText,
        });
        myToSgDateList.push({
          [item.firstChild.childNodes[0]._rawText]:
            item.childNodes[2].childNodes[0]._rawText,
        });
      }
    });

    data[departureOption1] = sgToMyDateList;
    data[departureOption2] = myToSgDateList;

    const sgToMySeatCheck = seatCheck(departureOption1, data[departureOption1]);
    const myToSgSeatCheck = seatCheck(departureOption2, data[departureOption2]);

    const mailBody = convertToHTML(
      sgToMySeatCheck,
      myToSgSeatCheck,
      departureOption1,
      departureOption2
    );

    if (mailBody.success) {
      await sendMail(
        `Transtar VTL ${data["lastUpdated"]}`,
        mailBody.data,
        data["lastUpdated"]
      );
    } else {
      console.log(data["lastUpdated"], mailBody.data);
    }
  } catch (err) {
    console.error(err);
  }
})();