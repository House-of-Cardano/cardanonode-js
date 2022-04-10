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

// const datumHash = process.argv[2];

// Need to call the REST API /cardano-explorer-queryAddr before running script because UTxOs have been consumed => USE THE GAME WALLET

const checkAddrUTxO = checkUTxO(
  "../houseofcardano-explorer-testnet/data/",
  "addrUTxO"
);

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

const gameAddres = "addr_test1qr8px8xy5acc7mm40s5vckn5unssvx0wxkw8vnlwyl9gexgc8u0yys6k9ajrqje5nwj8pec34f8qkrk797zkmva83g5qafyhn6";

execSync(`cardano-cli transaction build \
--${NETWORK_PARAMETERS.era} \
--${NETWORK_PARAMETERS.networkMagic} \
--tx-in ${checkAddrUTxO[0]} \
--tx-in-collateral ${checkAddrUTxO[0]} \
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
