const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const RedeemFunds = require("../transactions/redeemFunds");
const queryBank = require("../requests/queryBank");
const queryScriptAddr = require("../requests/queryScriptAddr");
const checkBank = require("../processing/checkBankUTxO");
const checkScriptAddr = require("../processing/checkScriptAddrUTxO");

queryBank(
  "http://167.86.98.239:8000/query/cardano-explorer-queryBank?addr=addr_test1vzc7magws73cel8lshw4yncmejylq4lutw2xx9ef02l70xs5jjjv5",
  "bankUTxO"
);

queryScriptAddr(
  "http://167.86.98.239:8000/query/cardano-explorer-queryScriptAddr?addr=addr_test1wzhfye4zxffxd59gg0fhjzavy7uuhpul04kr5myavevh29svlsrpc&datumHash=\\xfac96da1bf190d85ae7e7a45b07b95826c3eb91b839564959d8411d4e0dc089c",
  "scriptAddrUTxO"
);

describe("a transaction to transfer funds to cagnotte contains all the elements necessary to be validated", () => {
  const checkBankUTxO = checkBank("data", "bankUTxO");
  const checkScriptAddrUTxO = checkScriptAddr("data", "scriptAddrUTxO");

  era = NETWORK_PARAMETERS.era;
  networkMagic = NETWORK_PARAMETERS.networkMagic;
  utxo = checkScriptAddrUTxO;
  scriptFile = SCRIPT_ADDRESS_PARAMETERS.scriptFile;
  datumValue = SCRIPT_ADDRESS_PARAMETERS.datumValueTwo;
  redeemer = SCRIPT_ADDRESS_PARAMETERS.redeemer;
  txIn = checkBankUTxO;
  txOutCharity = ADDRESSES.txOutCharity;
  txOutCagnotte = ADDRESSES.txOutCagnotte;
  changeAddress = ADDRESSES.bank;
  protocolParams = NETWORK_PARAMETERS.protocolParams;
  buildOutFile = NETWORK_PARAMETERS.buildOutFile;
  signingKey = ADDRESSES.signingKey;
  signOutFile = NETWORK_PARAMETERS.signOutFile;
  const redeemFunds = new RedeemFunds({
    networkMagic,
    era,
    utxo,
    scriptFile,
    datumValue,
    redeemer,
    txIn,
    changeAddress,
    protocolParams,
    buildOutFile,
    signingKey,
    signOutFile,
  });

  it("has all of the elements that a simple transfer transaction needs", () => {
    expect(redeemFunds.era).toEqual(era);
    expect(redeemFunds.networkMagic).toEqual(networkMagic);
    expect(redeemFunds.utxo).toEqual(utxo);
    expect(redeemFunds.scriptFile).toEqual(scriptFile);
    expect(redeemFunds.datumValue).toEqual(datumValue);
    expect(redeemFunds.redeemer).toEqual(redeemer);
    expect(redeemFunds.txIn).toEqual(txIn);
    expect(redeemFunds.changeAddress).toEqual(changeAddress);
    expect(redeemFunds.protocolParams).toEqual(protocolParams);
    expect(redeemFunds.buildOutFile).toEqual(buildOutFile);
    expect(redeemFunds.signingKey).toEqual(signingKey);
    expect(redeemFunds.signOutFile).toEqual(signOutFile);
  });
  it("has UTxOs from a bank address", () => {
    expect(typeof redeemFunds.txIn[0]).toBe("string");
  });
  it("has sufficient funds", () => {
    expect(parseInt(redeemFunds.txIn[1])).toBeGreaterThan(
      NETWORK_PARAMETERS.minTransactionAmount
    );
  });
  it("has UTxOs from a scriptAddr", () => {
    expect(typeof redeemFunds.utxo[0][0]).toBe("string");
  });
  it("has the ticket price", () => {
    expect(parseInt(redeemFunds.utxo[0][1])).toBe(
      NETWORK_PARAMETERS.ticketPrice
    );
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

// How to mock calls to the blockchain to validate transactions? NEED A TICKET FOR THIS
