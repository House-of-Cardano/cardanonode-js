const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const fs = require("fs");
const path = require("path");

function checkUTxO(fldrName, fileName) {
  const filePath = path.join(fldrName, fileName);

  const data = fs.readFileSync(filePath, "utf-8");
  var jsonData = data;
  var UTxO = JSON.parse(jsonData);
  const selectUTxO = [];

  for (let i = 0; i < UTxO.length; i++) {
    if (parseInt(UTxO[i][3]) >= NETWORK_PARAMETERS.minTransactionAmount) {
      selectUTxO.push([
        UTxO[i][1].substring(2) + "#" + UTxO[i][2],
        UTxO[i][3],
      ]);
    } else {
      console.log(
        `Please select another address to act as bank. The UTxOs ${
          UTxO[i][1].substring(2) + "#" + UTxO[i][2]
        } does not contain sufficient funds`
      );
    }
  }
  return [selectUTxO[0][0], selectUTxO[0][1]];
}

// checkBankUTxO("data", "bankUTxO");

module.exports = checkUTxO;
