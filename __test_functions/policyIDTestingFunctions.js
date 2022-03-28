const fs = require("fs");

function mockPolicyKeyPairs() {
  const vkey = fs.readFileSync("./__tests__/policy.vkey", "utf-8");
  var jsonData = vkey;
  var policyVkey = JSON.parse(jsonData);

  const skey = fs.readFileSync("./__tests__/policy.skey", "utf-8");
  var jsonData = skey;
  var policySkey = JSON.parse(jsonData);

  const policyKeyPairs = [];

  policyKeyPairs.push(policyVkey, policySkey);
  return policyKeyPairs;
}

function mockPolicyScript() {
  const script = fs.readFileSync("./__tests__/policy.script", "utf-8");
  return script;
}

function mockPolicyID() {
  const id = fs.readFileSync("./__tests__/policyID", "utf-8");
  return id;
}

module.exports = { mockPolicyKeyPairs, mockPolicyScript, mockPolicyID };
