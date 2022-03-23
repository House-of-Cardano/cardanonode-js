const {
    NETWORK_PARAMETERS,
    SCRIPT_ADDRESS_PARAMETERS,
    ADDRESSES,
  } = require("../config");
  
  const fs = require("fs");
  const path = require("path");
  
  function checkScriptAddrUTxO(fldrName, fileName) {
    const filePath = path.join(fldrName, fileName);
  
    const data = fs.readFileSync(filePath, "utf-8");
    var jsonData = data;
    var scriptAddrUTxO = JSON.parse(jsonData);
    const selectScriptAddrUTxO = [];
  
    for (let i = 0; i < scriptAddrUTxO.length; i++) {
        if (parseInt(scriptAddrUTxO[i][2]) == NETWORK_PARAMETERS.ticketPrice) {
            selectScriptAddrUTxO.push([
            scriptAddrUTxO[i][0].substring(2) + "#" + scriptAddrUTxO[i][1],
            scriptAddrUTxO[i][2],
          ]);
        } else {
          console.log(
            `Please select another UTxO, as ${
                scriptAddrUTxO[i][0].substring(2) + "#" + scriptAddrUTxO[i][1]
            } does not contain the ticket price`
          );
        }
      }
    return selectScriptAddrUTxO;
  };
  
//   checkScriptAddrUTxO("data", "scriptAddrUTxO");
  
  module.exports = checkScriptAddrUTxO;
  