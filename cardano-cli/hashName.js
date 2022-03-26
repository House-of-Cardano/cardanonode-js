const { execSync } = require("child_process");

function hashName(name) {
    process.chdir("/home/node/HouseOfCardano/cardano-millions-testnet/cardano-millions-testnet");
    const hash = execSync(
        `cabal exec token-name -- ${name}` 
    );
    process.chdir("/home/node/HouseOfCardano/cardano-millions-testnet/cardanonode-js");

    return hash.toString();
};

module.exports = hashName;