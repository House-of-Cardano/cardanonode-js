const { execSync } = require("child_process");

const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");

const mockPolicy = require("../test_functions/policyIDTestingFunctions");

describe("policyID()", () => {
  const keys = mockPolicy.mockPolicyKeyPairs();
  const script = mockPolicy.mockPolicyScript();
  const id = mockPolicy.mockPolicyID();
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
    expect(script).toContain("9f01a5ceb3332a209ddc414668879264433228063d25b2d636149bc0");
  });
  it("generates a valid policyID", () => {
    expect(id).toEqual("63e39bfe53706bab0002b5fdc194cd5da79294656ca9301a7ca69193");
  });
});
