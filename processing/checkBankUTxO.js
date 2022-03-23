const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const fs = require("fs");
const path = require("path");

function checkBankUTxO(fldrName, fileName) {
  const filePath = path.join(fldrName, fileName);

  const data = fs.readFileSync(filePath, "utf-8");
  var jsonData = data;
  var bankUTxO = JSON.parse(jsonData);
  const selectBankUTxO = [];

  for (let i = 0; i < bankUTxO.length; i++) {
    if (parseInt(bankUTxO[i][3]) >= NETWORK_PARAMETERS.minTransactionAmount) {
      selectBankUTxO.push([
        bankUTxO[i][1].substring(2) + "#" + bankUTxO[i][2],
        bankUTxO[i][3],
      ]);
    } else {
      console.log(
        `Please select another address to act as bank. The UTxOs ${
          bankUTxO[i][1].substring(2) + "#" + bankUTxO[i][2]
        } does not contain sufficient funds`
      );
    }
  }
  return [selectBankUTxO[0][0], selectBankUTxO[0][1]];
}

// checkBankUTxO("data", "bankUTxO");

module.exports = checkBankUTxO;
