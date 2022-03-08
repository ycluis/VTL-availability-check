// load .env
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const { writeFile } = require("fs/promises");
const path = require("path");
const seatCheck = require("./utils/availabilityCheck");
const convertToHTML = require("./utils/formatMailBody");
const sendMail = require("./utils/emailService");
const sendSMS = require("./utils/smsService");
const checkIfLogExist = require("./utils/fileExistenceCheck");
const puppeteer = require("puppeteer");

(async () => {
  try {
    if (await checkIfLogExist("../", process.env.ERROR_LOG)) {
      console.log("Error found, exit here");
      return;
    }

    const browser = await puppeteer.launch({
      args: [
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
      ],
    });

    const [page] = await browser.pages();

    await page.goto(process.env.TRANSTAR_URL, { waitUntil: "networkidle0" });

    // await page.screenshot({ path: "transtar_home_page.png" });

    const pageData = await page.evaluate(() => {
      const data = {};
      const sgToMyDateList = [];
      const myToSgDateList = [];
      let departureFromSg = "";
      let departureFromMy = "";
      let lastUpdateAt = "";

      const lastUpdated = document.querySelector("h4");
      const items = document.querySelectorAll("tr");

      items.forEach((item, index) => {
        if (index === 0) {
          departureFromSg = item.querySelectorAll("th")[1].innerText;
          departureFromMy = item.querySelectorAll("th")[2].innerText;
          lastUpdateAt = lastUpdated.innerText;
        }

        if (index !== 0) {
          sgToMyDateList.push({
            [item.querySelectorAll("td")[0].innerText]:
              item.querySelectorAll("td")[1].innerText,
          });

          myToSgDateList.push({
            [item.querySelectorAll("td")[0].innerText]:
              item.querySelectorAll("td")[2].innerText,
          });
        }
      });

      data[departureFromSg] = sgToMyDateList;
      data[departureFromMy] = myToSgDateList;
      data["lastUpdateAt"] = lastUpdateAt;

      return {
        departureFromSg,
        departureFromMy,
        data,
      };
    });
    await browser.close();

    const sgToMySeatCheck = seatCheck(
      pageData["departureFromSg"],
      pageData["data"][pageData["departureFromSg"]]
    );
    const myToSgSeatCheck = seatCheck(
      pageData["departureFromMy"],
      pageData["data"][pageData["departureFromMy"]]
    );

    const mailBody = convertToHTML(
      sgToMySeatCheck,
      myToSgSeatCheck,
      pageData["departureFromSg"],
      pageData["departureFromMy"]
    );

    if (mailBody.success) {
      await sendMail(
        `Transtar VTL ${pageData["data"]["lastUpdateAt"]}`,
        mailBody.data,
        pageData["data"]["lastUpdateAt"],
        false
      );

      await sendSMS(
        `Transtar VTL ${pageData["data"]["lastUpdateAt"]}: Seat available`
      );
    } else {
      console.log(pageData["data"]["lastUpdateAt"], mailBody.data);
    }
  } catch (err) {
    console.error(err);
    await writeFile(
      path.join(__dirname, "/", process.env.ERROR_LOG),
      String(err)
    );
    await sendMail(
      "VTL Check Error Log",
      "Check attachment for error log",
      null,
      true
    );
    process.exit(1);
  }
})();
