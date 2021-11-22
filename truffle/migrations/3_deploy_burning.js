// DEPLOYING ON FANTOM CHAIN

const EggToken = artifacts.require("EggToken");
const Burning = artifacts.require("Burning");
const Staking = artifacts.require("Staking");
const Voting = artifacts.require("Voting");
const WithdrawableDistribution = artifacts.require("WithdrawableDistribution");

// Testnet Project Name: EGG Protocol
const EGG_TOKEN_NAME = "EGG Protocol";
const EGG_TOKEN_SYMBOL = "EGG";

// Testnet Total Supply: 2 000 000 EGG
const DECIMALS = "000000000000000000";
const EGG_TOTAL_SUPPLY = "2000000" + DECIMALS;

// Testnet Burn Contract: 50K EGG / 90 days until 200K Total Burnt 
const BURNING_BURN_LIMIT = "200000" + DECIMALS;
const BURNING_SINGLE_BURN_AMOUNT = "50000" + DECIMALS;

const NEW_OWNER = "0x9cdd3da8aeb62804bea3545a0b1a390073348993";

const fromWei = (x) => web3.utils.fromWei(x, "ether")

module.exports = async (deployer, networks, accounts) => {

// console.log(`~~~~~~~ current account : ${accounts[0]}`)
//   const EggTokenInstance = await EggToken.at("0x6dd04cf9d7221fedd6a8008d1577f3abbb011e1c")
//   console.log("***** DEPLOYED ***** EggToken at address: ", EggTokenInstance.address);

//   await deployer.deploy(
//     Burning,
//     EggTokenInstance.address,
//     BURNING_BURN_LIMIT,
//     BURNING_SINGLE_BURN_AMOUNT
//   );
//   const BurningInstance = await Burning.deployed();
//   console.log("***** DEPLOYED ***** Burning at address: ", BurningInstance.address);
//   await EggTokenInstance.setBurningContract(BurningInstance.address, BURNING_BURN_LIMIT);
//     console.log(`burning contrac bal: ${fromWei(await EggTokenInstance.balanceOf(BurningInstance.address))} , 
//         owner bal ${fromWei(await EggTokenInstance.balanceOf(accounts[0]))}`)
}


// COMMENT THIS FOR OTHER NETWORKS SINCE POLYGON IS SHITTY