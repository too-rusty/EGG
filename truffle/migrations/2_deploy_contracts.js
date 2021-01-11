const EggToken = artifacts.require("EggToken");
const Burning = artifacts.require("Burning");
const Staking = artifacts.require("Staking");
const Voting = artifacts.require("Voting");
const WithdrawableDistribution = artifacts.require("WithdrawableDistribution");

const EGG_TOKEN_NAME = "EGG Protocol";
const EGG_TOKEN_SYMBOL = "EGG";

const DECIMALS = "000000000000000000";
const EGG_TOTAL_SUPPLY = "50000000" + DECIMALS;

const BURNING_BURN_LIMIT = "10000000" + DECIMALS;
const BURNING_SINGLE_BURN_AMOUNT = "100000" + DECIMALS;

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
  console.log("***** DEPLOYED ***** Staking at address: ", StakingInstance.address);
  await EggTokenInstance.setStakingContract(StakingInstance.address);

  await deployer.deploy(Voting, EggTokenInstance.address);
  const VotingInstance = await Voting.deployed();
  console.log("***** DEPLOYED ***** Voting at address: ", VotingInstance.address);

  await deployer.deploy(WithdrawableDistribution, EggTokenInstance.address);
  const WithdrawableDistributionInstance = await WithdrawableDistribution.deployed();
  console.log(
    "***** DEPLOYED ***** WithdrawableDistribution at address: ",
    WithdrawableDistributionInstance.address
  );
  await EggTokenInstance.setLockableDistributionContract(WithdrawableDistributionInstance.address);
};
