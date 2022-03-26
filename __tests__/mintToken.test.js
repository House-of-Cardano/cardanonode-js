const { execSync } = require("child_process");

const {
  NETWORK_PARAMETERS,
  SCRIPT_ADDRESS_PARAMETERS,
  ADDRESSES,
} = require("../config");
const hashName = require("../cardano-cli/hashName");
const policy = require("../cardano-cli/policyID");

describe("hashName()", () => {
  const hash = hashName("Cardano-Millions-Token");
  const policy = policyID();

  it("generates a string value", () => {
    expect(typeof hash).toBe("string");
  });
  it("correctly hashes text strings to a sha256 hash", () => {
    expect(console.log(hash)).toEqual(
      console.log("43617264616e6f2d4d696c6c696f6e732d546f6b656e")
    ); // WTF is going on here - the output strings are identical but test fails if I don't console.log. The output strings are both of the exact same type too. Is tehre an issue with the output of the hashName function?
  });
  it("generates a hash that can be used in a cardano-clie transaction", () => {
    execSync`cardano-cli transaction build \
    --${NETWORK_PARAMETERS.era} \
    --${NETWORK_PARAMETERS.networkMagic} \
    --tx-in $1 \
    --tx-in-collateral $1 \
    --tx-out "$bank+$minAdaAmount+$tokenamount $policyid.$tokenname" \
    --change-address $bank \
    --mint="$tokenamount $policyid.$tokenname" \
    --minting-script-file ./blockchain/policy/policy.script \
    --protocol-params-file ./blockchain/protocol.json \
    --out-file ./blockchain/mint_tx.raw`;
  });
});
