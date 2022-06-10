const { execSync } = require("child_process");
const nodemailer = require("nodemailer");
const {
  NETWORK_PARAMETERS,
  MINTING_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
  MAIL,
} = require("../config");

function randomiser() {
  var randomNumber = Math.floor(
    (Math.random() + Math.floor(Math.random() * 9) + 1) * Math.pow(10, 15)
  );
  console.log(`Random number: ${randomNumber}`);
  return randomNumber;
}

function generateHash(randomNumber) {
  const hash = execSync(
    `cardano-cli transaction hash-script-data --script-data-value ${randomNumber}`
  );
  console.log(`Hash: ${hash.toString()}`);
  return hash.toString();
}

function spliceInteger(randomNumber) {
  let splicedInteger = [];
  const firstStr = String(randomNumber).slice(0, 4);
//   const firstNum = Number(firstStr);
  const secondStr = String(randomNumber).slice(4, 8);
//   const secondNum = parseFloat(secondStr);
  const thirdStr = String(randomNumber).slice(8, 12);
//   const thirdNum = Number(thirdStr);
  const forthStr = String(randomNumber).slice(12, 16);
//   const forthNum = Number(forthStr);
  splicedInteger.push(firstStr, secondStr, thirdStr, forthStr);

  return splicedInteger;
}

function sendMail(address, input) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL.EMAIL_USERNAME,
      clientId: MAIL.CLIENTID,
      clientSecret: MAIL.CLIENT_SECRET,
      refreshToken: MAIL.REFRESH_TOKEN,
      accessToken: MAIL.ACCESS_TOKEN,
    },
  });

  const mailConfigurations = {
    from: MAIL.EMAIL_USERNAME,
    to: `${address}`,
    subject:
      "You are receiving important information concerning the HouseOfCardano cardano-millions lotto from a verified source",
    html: `<h2>Hi There!</h2> <br><br> <h3> HouseOfCardano thanks you for being a keeper of the secret</h3> <br><br> The unhased value to release the script address is ${input}`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
}

const randomNumber = randomiser();
const hash = generateHash(randomNumber);
const splice = spliceInteger(randomNumber)
console.log(`Random Number: ${randomNumber}`);
console.log(`The hash: ${hash}`);
const admin1 = "simonholmes001@hotmail.com";
const admin2 = "kovanostra@gmail.com";
const admin3 = "simonholmesabc@gmail.com";
const admin4 = "hoc@house-of-cardano.io";
const organiserAddress = "hoc@house-of-cardano.io";
sendMail(admin1, splice[0]);
sendMail(admin2, splice[1]);
sendMail(admin3, splice[2]);
sendMail(admin4, splice[3]);
sendMail(organiserAddress, hash);

module.exports = { randomiser, generateHash, spliceInteger, sendMail };
