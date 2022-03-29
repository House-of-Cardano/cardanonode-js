const { execSync } = require("child_process");
const fs = require("fs");

// class Policy that is used in makePolicyFiles.js to create the following files ->
// -> policy key pairs
// -> policy.script
// -> policyID

class Policy {
  constructor() {}

  static policyKeyPairs() {
    // Generate key pairs ->
    execSync(`cardano-cli address key-gen \
    --verification-key-file ./blockchain/policy/policy.vkey \
    --signing-key-file ./blockchain/policy/policy.skey`);
  }
  static policyScript() {
    execSync(". ./cardano-cli/policy/policyID.sh");
  }
}

// Policy.policyKeyPairs();
// Policy.policyScript();

module.exports = Policy;
