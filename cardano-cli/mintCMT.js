const { execSync } = require("child_process");
const fs = require("fs");

const checkUTxO = require("../processing/checkAddrUTxO");
const hashName = require("./hashName");

const {
  NETWORK_PARAMETERS,
  MINTING_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

function policyID() {
  const policyid = fs.readFileSync("./blockchain/policy/policyID", "utf-8");
  return policyid
};

const name = `${MINTING_PARAMETERS.tokenName}+${MINTING_PARAMETERS.iteration}`;
const tokenName = hashName(name).replace(/(\r\n|\n|\r)/gm, "");
const policyid = policyID();
const policyidClean = policyid.replace(/(\r\n|\n|\r)/gm, "");

const mint = `"${MINTING_PARAMETERS.tokenAmount} ${policyidClean}.${tokenName}"`.replace(/(\r\n|\n|\r)/gm, "");
const txOut = `${ADDRESSES.scriptAddr}+${NETWORK_PARAMETERS.minAdaAmount}+${mint}`.replace(/(\r\n|\n|\r)/gm, "");

const datumHash = `${SCRIPT_ADDRESS_PARAMETERS.scriptDatumHashOne}`.replace(/(\r\n|\n|\r)/gm, "");

const gameAddres = process.argv[2];

const utxoIn = process.argv[3];

execSync(`cardano-cli transaction build \
--${NETWORK_PARAMETERS.era} \
--${NETWORK_PARAMETERS.networkMagic} \
--tx-in ${utxoIn} \
--tx-in-collateral ${utxoIn} \
--tx-out ${txOut} \
--tx-out-datum-hash ${datumHash} \
--change-address ${gameAddres} \
--mint=${mint} \
--minting-script-file ./blockchain/policy/policy.script \
--out-file ./blockchain/outfile.tx`);

execSync(`cardano-cli transaction sign \
--tx-body-file ./blockchain/outfile.tx \
--signing-key-file ./blockchain/payment.skey \
--signing-key-file ./blockchain/policy/policy.skey  \
--${NETWORK_PARAMETERS.networkMagic} \
--out-file ./blockchain/outfile.signed`);

execSync(
  `cardano-cli transaction submit \
  --${NETWORK_PARAMETERS.networkMagic} \
  --tx-file ./blockchain/outfile.signed`
);
