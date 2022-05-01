const { execSync } = require("child_process");
const res = require("express/lib/response");
const fs = require("fs");
const fetch = require("node-fetch");

const {
  NETWORK_PARAMETERS,
  MINTING_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const UTxOList = fs.readFileSync(
  "./blockchain/scriptAddrUTxOWithDatumHash.json",
  "utf-8"
);

const utxoList = JSON.parse(UTxOList);

const charity = NETWORK_PARAMETERS.charityRate * NETWORK_PARAMETERS.ticketPrice;
const bank = NETWORK_PARAMETERS.gameRate * NETWORK_PARAMETERS.ticketPrice;

const bankAddr = ADDRESSES.bank.replace(/(\r\n|\n|\r)/gm, "");
const charityAddr = ADDRESSES.charity.replace(/(\r\n|\n|\r)/gm, "");
const cagnotteAddr = ADDRESSES.cagnotte.replace(/(\r\n|\n|\r)/gm, "");

const fetchURL =
  "http://167.86.98.239:8000/dbsync/cardano-explorer-queryAddr?addr=addr_test1vzc7magws73cel8lshw4yncmejylq4lutw2xx9ef02l70xs5jjjv5&isBank=no";

console.log("Finding a bank UTxO...");

const getBankUTxO = async () => {
  const response = await fetch(fetchURL);
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    if (parseInt(data[i].value) >= NETWORK_PARAMETERS.minTransactionAmount) {
      const UTxO = data[i].hash.substring(2) + "#" + data[i].index;
      jsonUTxO = JSON.stringify(UTxO);
      fs.writeFileSync("./blockchain/UTxO.json", jsonUTxO, "utf8");
      console.log("A json file has been saved (UTxO.json)");
    }
  }
};

function buildSignSubmitTransaction(utxoList, i) {
  console.log(`Submitting transaction ${i}...`);
  const bankUtxO = fs.readFileSync("./blockchain/UTxO.json", "utf-8");
  execSync(`cardano-cli transaction build \
  --${NETWORK_PARAMETERS.era} \
  --${NETWORK_PARAMETERS.networkMagic} \
  --tx-in ${utxoList[i][1].substring(2) + "#" + utxoList[i][2]} \
  --tx-in-script-file ./plutus-scripts/validate-payment.plutus \
  --tx-in-datum-value ${SCRIPT_ADDRESS_PARAMETERS.datumValueTwo} \
  --tx-in-redeemer-file ./blockchain/unit.json \
  --tx-in-collateral ${bankUtxO
    .replaceAll(/"/g, "")
    .replace(/(\r\n|\n|\r)/gm, "")} \
  --tx-out ${charityAddr}+${NETWORK_PARAMETERS.minRequiredAmount} \
  --tx-out ${bankAddr}+${NETWORK_PARAMETERS.minRequiredAmount} \
  --change-address ${cagnotteAddr} \
  --protocol-params-file ./blockchain/protocol.json \
  --out-file ./blockchain/outfile.tx`);

  execSync(`cardano-cli transaction sign \
  --tx-body-file ./blockchain/outfile.tx \
  --signing-key-file ./blockchain/bank.skey \
  --${NETWORK_PARAMETERS.networkMagic} \
  --out-file ./blockchain/outfile.signed`);

  execSync(`cardano-cli transaction submit \
  --${NETWORK_PARAMETERS.networkMagic} \
  --tx-file ./blockchain/outfile.signed`);
  console.log(`Transaction ${i} submitted`);
}

for (let i = 0; i < utxoList.length; i++) {
  setTimeout(getBankUTxO, 25000);
  setTimeout(buildSignSubmitTransaction, 30000, utxoList, i);
}
