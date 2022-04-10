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

// const datumLuckyNumbersHash = process.argv[2];
const datumLuckyNumbersHash = "619e1212cba33a7c63bde9aef1352a1157603da376d894f0e71f24db568b33cc";

const datumHash =
  "7619130e301e1b52e1c333c96d8489fba07ea98eeec3327f719a03d2c713302f";

// const playerAddr = process.argv[3];
const playerAddr =
  "addr_test1qrfjkhmgde2nk3wymyvwfnxpfcn69kfgy98pfsmpsj7hcc42tc995kgsakxjtfd58zsq64hg224uryqdjq35w4v98scsvw9u2h";

// Need to call the REST API /cardano-explorer-queryAddr before running script because UTxOs have been consumed
// NEED TO FIX THIS TO JUST SELECT AN INDEX EQUAL TO 1
const checkGameAddrUTxO = checkUTxO(
  "../houseofcardano-explorer-testnet/data/",
  "addrUTxO"
);

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

const url = `http://167.86.98.239:8000/dbsync/cardano-explorer-queryScriptAddr?addr=${ADDRESSES.scriptAddr}&datumHash=\\x${datumHash}`;

const datumHash2 = `${SCRIPT_ADDRESS_PARAMETERS.scriptDatumHashTwo}`.replace(/(\r\n|\n|\r)/gm, "");

const utxoData = async () => {
  const utxoData = await query(url);
  const utxo = utxoData[0].hash.substring(2) + "#" + utxoData[0].index;
  console.log(utxo);
  execSync(`cardano-cli transaction build \
--${NETWORK_PARAMETERS.era} \
--${NETWORK_PARAMETERS.networkMagic} \
--tx-in 526b62e36794a138d91932970b473672ad7a7121cf1a38f558bd0cd270a40e85#1 \
--tx-in-script-file ./plutus-scripts/validate-payment.plutus \
--tx-in-datum-value ${SCRIPT_ADDRESS_PARAMETERS.datumValueOne} \
--tx-in-redeemer-file ./blockchain/unit.json \
--tx-in ${checkGameAddrUTxO[0]} \
--tx-in-collateral ${checkGameAddrUTxO[0]} \
--tx-out ${playerAddr}+${NETWORK_PARAMETERS.minAdaAmount}+${mint} \
--tx-out-datum-hash ${datumLuckyNumbersHash} \
--tx-out ${ADDRESSES.scriptAddr}+${NETWORK_PARAMETERS.ticketPrice} \
--tx-out-datum-hash ${datumHash2} \
--change-address ${playerAddr} \
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

const utxo = utxoData();