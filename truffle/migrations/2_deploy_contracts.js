const Web3ProviderEngine = require("@trufflesuite/web3-provider-engine");

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

module.exports = async (deployer, networks, accounts) => {
  await deployer.deploy(EggToken, EGG_TOKEN_NAME, EGG_TOKEN_SYMBOL, EGG_TOTAL_SUPPLY);
  const EggTokenInstance = await EggToken.deployed();
  console.log("***** DEPLOYED ***** EggToken at address: ", EggTokenInstance.address);

  await deployer.deploy(
    Burning,
    EggTokenInstance.address,
    BURNING_BURN_LIMIT,
    BURNING_SINGLE_BURN_AMOUNT
  );
  const BurningInstance = await Burning.deployed();
  console.log("***** DEPLOYED ***** Burning at address: ", BurningInstance.address);
  await EggTokenInstance.setBurningContract(BurningInstance.address, BURNING_BURN_LIMIT);

  await deployer.deploy(Staking, EggTokenInstance.address);
  const StakingInstance = await Staking.deployed();
  // Testnet Staking Yield: 9% for 180 days
  StakingInstance.setStakingOptions(
    [7776000 * 2],
    [900]
  )
  console.log("***** DEPLOYED ***** Staking at address: ", StakingInstance.address);
  await EggTokenInstance.setStakingContract(StakingInstance.address);

  await deployer.deploy(Voting, EggTokenInstance.address);
  const VotingInstance = await Voting.deployed();
  console.log("***** DEPLOYED ***** Voting at address: ", VotingInstance.address);

  await deployer.deploy(WithdrawableDistribution, EggTokenInstance.address);
  const WithdrawableDistributionInstance = await WithdrawableDistribution.deployed();
  // Testnet Distribution: 2000 EGG , first send the tokens to the distribution contract
  await EggTokenInstance.transfer(WithdrawableDistributionInstance.address, web3.utils.toWei("2000", "ether"))
  await WithdrawableDistributionInstance.increaseUnlockedWithdrawalLimits(
    [
      "0x0d46186692b8f67c87e86Be23A1cb9bd0c490789",
      "0x99fd205c1B7Ff02e51ce36fEA061045Fb9125E6E",
      "0x47BA1aDF0e6188df9ad2628eD72e780ffb6e5fD4"
    ],
    [
      "527",
      "673",
      "800"
    ].map( x => web3.utils.toWei(x, "ether") )
  )
  console.log(
    "***** DEPLOYED ***** WithdrawableDistribution at address: ",
    WithdrawableDistributionInstance.address
  );
  await EggTokenInstance.setLockableDistributionContract(WithdrawableDistributionInstance.address);
  // Testnet Owner Account (for all contracts): 0x9cdd3da8aeb62804bea3545a0b1a390073348993
  let contracts_deriving_ownable = [WithdrawableDistributionInstance, VotingInstance, StakingInstance]
  await Promise.all(
    contracts_deriving_ownable.map( async instance => await instance.transferOwnership(NEW_OWNER) )
  )
  await EggTokenInstance.transfer(NEW_OWNER, await EggTokenInstance.balanceOf(accounts[0]))
  // transfer the remaining balance of deployer to the new owner
};


/*
truffle compile --all
truffle migrate --network ftm_testnet
*/