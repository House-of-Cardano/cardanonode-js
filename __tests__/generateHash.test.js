const { execSync } = require("child_process");

const {
  randomiser,
  generateHash,
  spliceInteger,
  sendMail,
} = require("../processing/generateHash");

describe("randomiser()", () => {
  const number = randomiser();
  console.log(`number: ${number}`);
  var digits = (number + "").replace(".", "").length;
  console.log(`digits: ${digits}`);

  it("generates an integer value", () => {
    expect(typeof number).toBe("number");
  });
  it("generates an integer of 16 digits", () => {
    expect(digits).toEqual(16);
  });
  it("correctly sends the random integer to the admin email addresses", () => {
    sendMail();
  });
});

describe("generateHash()", () => {
  let randomNumber = 9217229910837386;
  const hash = generateHash(randomNumber);
  console.log(`hash: ${hash.replace(/(\r\n|\n|\r)/gm, "")}`);

  it("generates a string value", () => {
    expect(typeof hash).toBe("string");
  });
  it("correctly hashes input random number to a sha256 hash", () => {
    expect(hash.replace(/(\r\n|\n|\r)/gm, "")).toEqual(
      "a8f6cb02d23451a710a16831a2f9d61cefc7dd64c1f7afede6e426c71e846d62"
    );
  });
  it("correctly sends the hash to organisers email address", () => {
    sendMail();
  });
});

describe("spliceInteger()", () => {
  const randomNumber = 9217229910837386;
  const randomNumber2 = 9217029910830386; // To test for leading Zeros
  const splicedInteger = spliceInteger(randomNumber);
  const splicedInteger2 = spliceInteger(randomNumber2);
  const splicedTogether = "" + splicedInteger[0] + splicedInteger[1] + splicedInteger[2] + splicedInteger[3];
  const splicedTogetherNumber = Number(splicedTogether);
  const hash = execSync(
    `cardano-cli transaction hash-script-data --script-data-value ${splicedTogetherNumber}`
  );
  console.log(`Spliced together: ${splicedTogetherNumber}`);
  console.log(`Recalculated hash: ${hash}`);

  it("generates an array", () => {
    expect(typeof splicedInteger).toBe("object");
  });
  it("generates correctly splits the random integer into four consecutive numbers", () => {
    expect(typeof splicedInteger[0]).toBe("string");
  });
  it("generates correctly splits the random integer into four consecutive numbers", () => {
    expect(typeof splicedInteger[1]).toBe("string");
  });
  it("generates correctly splits the random integer into four consecutive numbers", () => {
    expect(typeof splicedInteger[2]).toBe("string");
  });
  it("generates correctly splits the random integer into four consecutive numbers", () => {
    expect(typeof splicedInteger[3]).toBe("string");
  });
  it("generates correctly splits the random integer into four consecutive chunks, in order", () => {
    expect(splicedInteger[0]).toEqual("9217");
  });
  it("generates correctly splits the random integer into four consecutive chunks, in order", () => {
    expect(splicedInteger[1]).toEqual("2299");
  });
  it("generates correctly splits the random integer into four consecutive chunks, in order", () => {
    expect(splicedInteger[2]).toEqual("1083");
  });
  it("generates correctly splits the random integer into four consecutive chunks, in order", () => {
    expect(splicedInteger[3]).toEqual("7386");
  });
  it("gives a splice that can be correctly spliced together to create the correct random number", () => {
    expect(splicedTogetherNumber).toEqual(9217229910837386);
  });
  it("gives a splice that can be correctly spliced together to create the correct hash", () => {
    expect(hash.toString().replace(/(\r\n|\n|\r)/gm, "")).toEqual("a8f6cb02d23451a710a16831a2f9d61cefc7dd64c1f7afede6e426c71e846d62");
  });
  
  it("does not delete leading zeros", () => {
    expect(splicedInteger2[0]).toEqual("9217");
  });
  it("does not delete leading zeros", () => {
    expect(splicedInteger2[1]).toEqual("0299");
  });
  it("does not delete leading zeros", () => {
    expect(splicedInteger2[2]).toEqual("1083");
  });
  it("does not delete leading zeros", () => {
    expect(splicedInteger2[3]).toEqual("0386");
  });
});
