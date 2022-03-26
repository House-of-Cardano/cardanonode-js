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

// queryBank(
//   "http://167.86.98.239:8000/query/cardano-explorer-queryBank?addr=addr_test1vzc7magws73cel8lshw4yncmejylq4lutw2xx9ef02l70xs5jjjv5",
//   "bankUTxO"
// );

// queryScriptAddr(
//   "http://167.86.98.239:8000/query/cardano-explorer-queryScriptAddr?addr=addr_test1wzhfye4zxffxd59gg0fhjzavy7uuhpul04kr5myavevh29svlsrpc&datumHash=\\xfac96da1bf190d85ae7e7a45b07b95826c3eb91b839564959d8411d4e0dc089c",
//   "scriptAddrUTxO"
// );

describe("a transaction to transfer funds to cagnotte contains all the elements necessary to be validated", () => {
  const checkBankUTxO = checkBank(
    "../houseofcardano-explorer-testnet/data",
    "bankUTxO"
  );
  const checkScriptAddrUTxO = checkScriptAddr(
    "../houseofcardano-explorer-testnet/data",
    "scriptAddrUTxO"
  );

  era = NETWORK_PARAMETERS.era;
  networkMagic = NETWORK_PARAMETERS.networkMagic;
  utxo = checkScriptAddrUTxO;
  scriptFile = SCRIPT_ADDRESS_PARAMETERS.scriptFile;
  datumValue = SCRIPT_ADDRESS_PARAMETERS.datumValueTwo;
  redeemer = SCRIPT_ADDRESS_PARAMETERS.redeemer;
  txIn = checkBankUTxO;
  txOut = "addr_test1vrq0llk2n5nj64vuk6tgeg5324hrktg4dy7rl83vxee8hwg7mpyx6";
  txOutDatumHash = "";
  changeAddress = ADDRESSES.bank;
  mintParams = "";
  mintingScriptFile = "";
  protocolParams = NETWORK_PARAMETERS.protocolParams;
  buildOutFile = NETWORK_PARAMETERS.buildOutFile;
  const buildTransaction = new BuildTransaction({
    era,
    networkMagic,
    utxo,
    scriptFile,
    datumValue,
    redeemer,
    txIn,
    txOut,
    txOutDatumHash,
    changeAddress,
    mintParams,
    mintingScriptFile,
    protocolParams,
    buildOutFile,
  });

  it("has all of the elements necessary to build a transaction ", () => {
    expect(buildTransaction.era).toEqual(era);
    expect(buildTransaction.networkMagic).toEqual(networkMagic);
    expect(buildTransaction.utxo).toEqual(utxo);
    expect(buildTransaction.scriptFile).toEqual(scriptFile);
    expect(buildTransaction.datumValue).toEqual(datumValue);
    expect(buildTransaction.redeemer).toEqual(redeemer);
    expect(buildTransaction.txIn).toEqual(txIn);
    expect(buildTransaction.txOut).toEqual(txOut);
    expect(buildTransaction.changeAddress).toEqual(changeAddress);
    expect(buildTransaction.mintParams).toEqual(mintParams);
    expect(buildTransaction.mintingScriptFile).toEqual(mintingScriptFile);
    expect(buildTransaction.protocolParams).toEqual(protocolParams);
    expect(buildTransaction.buildOutFile).toEqual(buildOutFile);
  });
  it("has UTxOs from a bank address", () => {
    expect(typeof buildTransaction.txIn[0]).toBe("string");
  });
  it("has sufficient funds", () => {
    expect(parseInt(buildTransaction.txIn[1])).toBeGreaterThan(
      NETWORK_PARAMETERS.minTransactionAmount
    );
  });
  it("has UTxOs from a scriptAddr", () => {
    expect(typeof buildTransaction.utxo[0][0]).toBe("string");
  });
  it("has the ticket price", () => {
    expect(parseInt(buildTransaction.utxo[0][1])).toBe(
      NETWORK_PARAMETERS.ticketPrice
    );
  });
});

