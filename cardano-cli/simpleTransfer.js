const { execSync } = require("child_process");

const BuildTransaction = require("../transactions/buildTransaction");
const checkBank = require("../processing/checkBankUTxO");
const checkScriptAddr = require("../processing/checkScriptAddrUTxO");

const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

// Need to call the REST API /cardano-explorer-queryBank before running script because UTxOs have been consumed
const checkBankUTxO = checkBank(
  "../houseofcardano-explorer-testnet/data",
  "bankUTxO"
);

execSync(`cardano-cli transaction build \
--${NETWORK_PARAMETERS.era} \
--${NETWORK_PARAMETERS.networkMagic} \
--tx-in ${checkBankUTxO[0]} \
--tx-out '${ADDRESSES.bank} + ${2000000}' \
--change-address ${ADDRESSES.bank} \
--protocol-params-file ${NETWORK_PARAMETERS.protocolParams} \
--out-file ./blockchain/outfile.tx`);

execSync(`cardano-cli transaction sign \
--tx-body-file ./blockchain/outfile.tx \
--signing-key-file ../../../addresses/bank.skey \
--${NETWORK_PARAMETERS.networkMagic} \
--out-file ./blockchain/outfile.signed`);

execSync(
  `cardano-cli transaction submit \
  --${NETWORK_PARAMETERS.networkMagic} \
  --tx-file ./blockchain/outfile.signed`
);
