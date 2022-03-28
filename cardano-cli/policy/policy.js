const { execSync } = require("child_process");
const fs = require("fs");

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
