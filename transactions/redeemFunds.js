class RedeemFunds {
    constructor({
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
      signOutFile
    }) {
      this.networkMagic = networkMagic;
      this.era = era;
      this.utxo = utxo;
      this.scriptFile = scriptFile;
      this.datumValue = datumValue;
      this.redeemer = redeemer;
      this.txIn = txIn;
      this.changeAddress = changeAddress;
      this.protocolParams = protocolParams;
      this.buildOutFile = buildOutFile;
      this.signingKey = signingKey;
      this.signOutFile = signOutFile
    }
  }
  
  module.exports = RedeemFunds;