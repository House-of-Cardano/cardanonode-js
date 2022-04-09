const { execSync } = require("child_process");

// Hashes the datum.json file prepared in luckyNumbers.js
// Prepares the input datum hash for mintCMT.js

execSync(
    `cardano-cli transaction hash-script-data --script-data-file ../houseofcardano-explorer-testnet/data/datum.json > ../houseofcardano-explorer-testnet/data/datum_hash.json`
  );