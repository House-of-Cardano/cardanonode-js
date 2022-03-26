const { execSync, exec } = require("child_process");
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
    // Create a policy.script file and fill it with an empty string ->
    execSync(`touch ./blockchain/policy/policy.script && echo "" > ./blockchain/policy/policy.script`);
    execSync(`echo "{" >> ./blockchain/policy/policy.script`);
    execSync(`echo "  \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file ./blockchain/policy/policy.vkey)\"," >> ./blockchain/policy/policy.script`);
    execSync(`echo "  \"type\": \"sig\"" >> ./blockchain/policy/policy.script`);
    execSync(`echo "}" >> ./blockchain/policy/policy.script`); 
    };
    
  static policyID() {
    // Generate policyID ->
    const policyID = 
    execSync(`cardano-cli transaction policyid
    --script-file ./blockchain/policy/policy.script >> ./blockchain/policy/policyID`
    );
    console.log(policyID);
    return policyID.toString();
  }
}

// Policy.policyKeyPairs();
Policy.policyScript();
// Policy.policyID();

module.exports = Policy;
