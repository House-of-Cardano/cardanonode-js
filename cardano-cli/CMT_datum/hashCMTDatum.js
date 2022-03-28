const { execSync } = require("child_process");

execSync(
    `cardano-cli transaction hash-script-data --script-data-file ./data/datum.json > ./data/datum_hash.json`
  );