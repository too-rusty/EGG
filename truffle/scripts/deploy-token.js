

const EggToken = artifacts.require("EggToken");

const EGG_TOKEN_NAME = "EGG Protocol";
const EGG_TOKEN_SYMBOL = "EGG";

// Testnet Total Supply: 2 000 000 EGG
const DECIMALS = "000000000000000000";
const EGG_TOTAL_SUPPLY = "10000000" + DECIMALS;

module.exports = async (done) => {
  const EggTokenInstance = await EggToken.new(EGG_TOKEN_NAME, EGG_TOKEN_SYMBOL, EGG_TOTAL_SUPPLY);
  console.log("***** DEPLOYED ***** EggToken at address: ", EggTokenInstance.address);
  done()
}

// truffle exec scripts/deploy-token.js --network matic_mainnet