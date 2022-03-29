const { execSync } = require("child_process");

// Hashes the datum.json file prepared in luckyNumbers.js
// Prepares the input datum hash for mintCMT.js

execSync(
    `cardano-cli transaction hash-script-data --script-data-file ./blockchain/datum.json > ./blockchain/datum_hash.json`
  );