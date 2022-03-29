const fs = require("fs");

// Reads the lucky numbers chosen by the player and prepares the datum.json file ready to be hashed in hashCMTDatume.js

function getLuckyNumbers() {
  const data = fs.readFileSync(
    "../houseofcardano-explorer-testnet/data/datum",
    "utf-8"
  );
  var jsonData = data;
  var numbers = JSON.parse(jsonData);
  const luckyNumbers = [];

  for (let i = 0; i < numbers.length; i++) {
    luckyNumbers.push(numbers[i]);
  }
  return luckyNumbers;
}

const luckyNumbers = getLuckyNumbers();

const map = new Map();

map.set("key1", luckyNumbers[0]);
map.set("key2", luckyNumbers[1]);
map.set("key3", luckyNumbers[2]);
map.set("key4", luckyNumbers[3]);
map.set("key5", luckyNumbers[4]);

const datum = {
  constructor: 0,
  fields: [
    { bytes: "416363657074" },
    { int: map.get("key1") },
    { int: map.get("key2") },
    { int: map.get("key3") },
    { int: map.get("key4") },
    { int: map.get("key5") },
  ],
};

const jsonDatum = JSON.stringify(datum);

fs.writeFile("./blockchain/datum.json", jsonDatum, "utf8", function (err) {
if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
}
console.log("A json file has been saved");
});
