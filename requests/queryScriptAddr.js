const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const queryScriptAddr = (url, fileName) => {
  const scriptAddrUTxO = [];

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        scriptAddrUTxO.push([data[i].hash, data[i].index, data[i].value]);
      }

      const jsonFile = JSON.stringify(scriptAddrUTxO);
      const filePath = path.join("data", fileName);

      fs.writeFileSync(filePath, jsonFile, "utf8");
    });
};

// queryScriptAddr(
//   "http://167.86.98.239:8000/query/cardano-explorer-queryScriptAddr?addr=addr_test1wzhfye4zxffxd59gg0fhjzavy7uuhpul04kr5myavevh29svlsrpc&datumHash=\\xfac96da1bf190d85ae7e7a45b07b95826c3eb91b839564959d8411d4e0dc089c",
//   "scriptAddrUTxO"
// );

module.exports = queryScriptAddr;
