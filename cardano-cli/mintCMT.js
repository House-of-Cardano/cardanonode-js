const { execSync } = require("child_process");
const fs = require("fs");

const checkBank = require("../processing/checkBankUTxO");
const hashName = require("./hashName");

const {
  NETWORK_PARAMETERS,
  MINTING_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

// Need to call the REST API /cardano-explorer-queryBank before running script because UTxOs have been consumed

const checkBankUTxO = checkBank(
  "../houseofcardano-explorer-testnet/data",
  "bankUTxO"
);

function policyID() {
  const policyid = fs.readFileSync("./blockchain/policy/policyID", "utf-8");
  return policyid
};

const name = "CardanoMillionsToken";
const tokenName = hashName(name).replace(/(\r\n|\n|\r)/gm, "");
const policyid = policyID();
const policyidClean = policyid.replace(/(\r\n|\n|\r)/gm, "");

const mint = `"${MINTING_PARAMETERS.tokenAmount} ${policyidClean}.${tokenName}"`.replace(/(\r\n|\n|\r)/gm, "");
const txOut = `${ADDRESSES.bank}+${NETWORK_PARAMETERS.minAdaAmount}+${mint}`.replace(/(\r\n|\n|\r)/gm, "");

function hashDatum() {
  const data = fs.readFileSync("./blockchain/datum_hash.json", "utf-8");
  return data;
};  
const hashdatum = hashDatum();
const hashedDatum = hashdatum.replace(/(\r\n|\n|\r)/gm, "");

execSync(`cardano-cli transaction build \
--${NETWORK_PARAMETERS.era} \
--${NETWORK_PARAMETERS.networkMagic} \
--tx-in ${checkBankUTxO[0]} \
--tx-in-collateral ${checkBankUTxO[0]} \
--tx-out ${txOut} \
--tx-out-datum-hash ${hashedDatum} \
--change-address ${ADDRESSES.bank} \
--mint=${mint} \
--minting-script-file ./blockchain/policy/policy.script \
--out-file ./blockchain/outfile.tx`);

execSync(`cardano-cli transaction sign \
--tx-body-file ./blockchain/outfile.tx \
--signing-key-file ../../../addresses/bank.skey \
--signing-key-file ./blockchain/policy/policy.skey  \
--${NETWORK_PARAMETERS.networkMagic} \
--out-file ./blockchain/outfile.signed`);

execSync(
  `cardano-cli transaction submit \
  --${NETWORK_PARAMETERS.networkMagic} \
  --tx-file ./blockchain/outfile.signed`
);
