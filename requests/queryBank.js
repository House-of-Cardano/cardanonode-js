const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// To mock call to API explorer backend. Will generate the bankUTxO output file directly from explorer backend
// when cardanonode-js repo running on the explorer backend server

const queryBank = (url, fileName) => {
  const bankUTxO = [];

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        bankUTxO.push([
          data[i].address,
          data[i].hash,
          data[i].index,
          data[i].value,
        ]);
      }

      const jsonFile = JSON.stringify(bankUTxO);
      const filePath = path.join("data", fileName);

      fs.writeFileSync(filePath, jsonFile, "utf8");
    });
};

// queryBank(
//   "http://167.86.98.239:8000/query/cardano-explorer-queryBank?addr=addr_test1vzc7magws73cel8lshw4yncmejylq4lutw2xx9ef02l70xs5jjjv5",
//   "bankUTxO"
// );

module.exports = queryBank;
