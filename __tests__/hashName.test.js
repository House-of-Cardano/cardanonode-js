const hashName = require("../cardano-cli/hashName");
const policy = require("../cardano-cli/policy");

describe("hashName()", () => {
  const hash = hashName("Cardano-Millions-Token");

  it("generates a string value", () => {
    expect(typeof hash).toBe("string");
  });
  it("correctly hashes text strings to a sha256 hash", () => {
    expect(console.log(hash)).toEqual(
      console.log("43617264616e6f2d4d696c6c696f6e732d546f6b656e")
    ); // WTF is going on here - the output strings are identical but test fails if I don't console.log. The output strings are both of the exact same type too. Is tehre an issue with the output of the hashName function?
  });
});