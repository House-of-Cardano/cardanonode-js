const policy = require("./policy");

// Uses the functions defined in policy.js to create the policy key pairs, the policy script and
// the policyID

const createPolicyKeyPairs = policy.policyKeyPairs();
createPolicyKeyPairs;

const createPolicyScript = policy.policyScript();
createPolicyScript;