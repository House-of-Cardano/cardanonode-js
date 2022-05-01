const { execSync } = require("child_process");
const fs = require("fs");
const fetch = require("node-fetch");

const checkUTxO = require("../processing/checkAddrUTxO");
const hashName = require("./hashName");
const query = require("../requests/queryAddrDatum");

const {
  NETWORK_PARAMETERS,
  MINTING_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const { response } = require("express");
const res = require("express/lib/response");

// Hashed version of the lucky numbers, coming from luckyNuymbers API call
const datumLuckyNumbersHash = process.argv[2];

// Transaction hash from funding the game wallet -> allows us to capture the player's wallet address
const playersAddress = process.argv[3];

const checkGameAddrUTxO = process.argv[4];

function policyID() {
  const policyid = fs.readFileSync("./blockchain/policy/policyID", "utf-8");
  return policyid;
}

const name = `${MINTING_PARAMETERS.tokenName}+${MINTING_PARAMETERS.iteration}`;
const tokenName = hashName(name).replace(/(\r\n|\n|\r)/gm, "");
const policyid = policyID();
const policyidClean = policyid.replace(/(\r\n|\n|\r)/gm, "");

const mint =
  `"${MINTING_PARAMETERS.tokenAmount} ${policyidClean}.${tokenName}"`.replace(
    /(\r\n|\n|\r)/gm,
    ""
  );

const datumHash1 = `${SCRIPT_ADDRESS_PARAMETERS.scriptDatumHashOne}`.replace(
  /(\r\n|\n|\r)/gm,
  ""
);
const CMTUTxOUrl = `http://167.86.98.239:8000/dbsync/cardano-explorer-queryScriptAddr?addr=${ADDRESSES.scriptAddr}&datumHash=\\x${datumHash1}`;
// const gameAddrUTxOUrl = `http://167.86.98.239:8000/dbsync/cardano-explorer-queryAddr?addr=${gameAddr}&isBank=no`;

const datumHash2 = `${SCRIPT_ADDRESS_PARAMETERS.scriptDatumHashTwo}`.replace(
  /(\r\n|\n|\r)/gm,
  ""
);

const utxoData = async () => {
  const utxoData = await query(CMTUTxOUrl);
  const utxo = utxoData[0].hash.substring(2) + "#" + utxoData[0].index;
  console.log(`UTxO: ${utxo}`);

  execSync(`cardano-cli transaction build \
--${NETWORK_PARAMETERS.era} \
--${NETWORK_PARAMETERS.networkMagic} \
--tx-in ${utxo} \
--tx-in-script-file ./plutus-scripts/validate-payment.plutus \
--tx-in-datum-value ${SCRIPT_ADDRESS_PARAMETERS.datumValueOne} \
--tx-in-redeemer-file ./blockchain/unit.json \
--tx-in ${checkGameAddrUTxO} \
--tx-in-collateral ${checkGameAddrUTxO} \
--tx-out ${playersAddress}+${NETWORK_PARAMETERS.minAdaAmount}+${mint} \
--tx-out-datum-hash ${datumLuckyNumbersHash} \
--tx-out ${ADDRESSES.scriptAddr}+${NETWORK_PARAMETERS.ticketPrice} \
--tx-out-datum-hash ${datumHash2} \
--change-address ${playersAddress} \
--protocol-params-file ./blockchain/protocol.json \
--out-file ./blockchain/test-asset.tx`);

  execSync(`cardano-cli transaction sign \
--tx-body-file ./blockchain/test-asset.tx \
--signing-key-file ./blockchain/payment.skey \
--${NETWORK_PARAMETERS.networkMagic} \
--out-file ./blockchain/test-asset.signed`);

  execSync(
    `cardano-cli transaction submit \
  --${NETWORK_PARAMETERS.networkMagic} \
  --tx-file ./blockchain/test-asset.signed`
  );
};

utxoData();
