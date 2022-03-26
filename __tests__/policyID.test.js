const { execSync } = require("child_process");

const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const mockPolicy = require("../test_functions/policyIDTestingFunctions");

describe("policyID()", () => {
  keys = mockPolicy.mockPolicyKeyPairs();
  script = mockPolicy.mockPolicyScript();
  it("generates a cborHex value as a string", () => {
    expect(typeof keys[0].cborHex).toBe("string");
  });
  it("generates a cborHex value as a string", () => {
    expect(typeof keys[1].cborHex).toEqual("string");
  });
  it("generates a valid policy vkey", () => {
    expect(keys[0].cborHex).toEqual(
      "5820c597c25514bce2c9f6a19014dde4113115d6d487a14372312278b0051d5f8c92"
    );
  });
  it("generates a valid policy skey", () => {
    expect(keys[1].cborHex).toEqual(
      "5820b98b2a2562054bd43e1d6a5891422073684ded9b482ebc11d2a82d300ea715fd"
    );
  });
  it("generates a policy script keyHash as a string", () => {
    expect(typeof script).toEqual("string");
  });
  it("generates a valid policy script", () => {
    expect(script).toContain("3b4d1291aa1f4370afdcad61a691c094f8ca629033e73d5f11f38f0d");
  });
  it("generates a valid policyID", () => {
    expect().toEqual("");
  });
  it("generates a policyID able to be used in a cardano-cli transaction build", () => {
    expect(execSync`cardano-cli transaction build \
        --${NETWORK_PARAMETERS.era} \
        --${NETWORK_PARAMETERS.networkMagic} \
        --tx-in $1 \
        --tx-in-collateral $1 \
        --tx-out "$bank+$minAdaAmount+$tokenamount $policyid.$tokenname" \
        --change-address $bank \
        --mint="$tokenamount $policyid.$tokenname" \
        --minting-script-file ./blockchain/policy/policy.script \
        --protocol-params-file ./blockchain/protocol.json \
        --out-file ./blockchain/mint_tx.raw`).toBe("");
  });
});
