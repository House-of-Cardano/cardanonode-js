const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const BuildTransaction = require("../transactions/buildTransaction");
const queryBank = require("../requests/queryBank");
const queryScriptAddr = require("../requests/queryScriptAddr");
const checkBank = require("../processing/checkBankUTxO");
const checkScriptAddr = require("../processing/checkScriptAddrUTxO");

describe("transferFunds()", () => {
  const checkBankUTxO = checkBank(
    "../houseofcardano-explorer-testnet/data",
    "bankUTxO"
  );
  const checkScriptAddrUTxO = checkScriptAddr(
    "../houseofcardano-explorer-testnet/data",
    "scriptAddrUTxO"
  );

  const era = NETWORK_PARAMETERS.era;
  const networkMagic = NETWORK_PARAMETERS.networkMagic;
  const txIn = checkBankUTxO;
  const txOut = checkBankUTxO;
  const changeAddress = ADDRESSES.bank;
  const protocolParams = NETWORK_PARAMETERS.protocolParams;
  const buildOutFile = NETWORK_PARAMETERS.buildOutFile;
  const transferFundsAtoB = BuildTransaction.transferFundsAtoB({
    era,
    networkMagic,
    txIn,
    txOut,
    changeAddress,
    protocolParams,
    buildOutFile,
  });

  it("returns a BuildTransaction instance", () => {
    expect(transferFundsAtoB instanceof BuildTransaction).toEqual(true);
  });
  it("is correctly built", () => {
    expect(something).toBeGreaterThan(something);
  });
  it("is correctly signed", () => {
    expect(something).toBeGreaterThan(something);
  });
  it("is correctly submitted", () => {
    expect(something).toBeGreaterThan(something);
  });
});
