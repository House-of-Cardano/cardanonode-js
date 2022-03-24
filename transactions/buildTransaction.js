const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

class BuildTransaction {
  constructor({
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
  }) {
    this.era = era;
    this.networkMagic = networkMagic;
    this.utxo = utxo;
    this.scriptFile = scriptFile;
    this.datumValue = datumValue;
    this.redeemer = redeemer;
    this.txIn = txIn;
    this.txOut = txOut;
    this.txOutDatumHash = txOutDatumHash;
    this.changeAddress = changeAddress;
    this.mintParams = mintParams;
    this.mintingScriptFile = mintingScriptFile;
    this.protocolParams = protocolParams;
    this.buildOutFile = buildOutFile;
  }

  static transferFundsAtoB() {
    const txIn = "";
    const txOut = "";
    return new BuildTransaction(
      NETWORK_PARAMETERS.era,
      NETWORK_PARAMETERS.networkMagic,
      txIn,
      txOut,
      ADDRESSES.bank,
      NETWORK_PARAMETERS.protocolParams,
      NETWORK_PARAMETERS.buildOutFile,
    );
  }
}

module.exports = BuildTransaction;
