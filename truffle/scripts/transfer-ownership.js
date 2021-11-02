
const IERC20 = artifacts.require("IERC20")
const EggToken = artifacts.require("EggToken");

const Burning = artifacts.require("Burning");
const Staking = artifacts.require("Staking");
const Voting = artifacts.require("Voting");
const WithdrawableDistribution = artifacts.require("WithdrawableDistribution");

const toWei = (amount) => web3.utils.toWei(amount, "ether")
const fromWei = (amount) => web3.utils.fromWei(amount, "ether")

const NEW_OWNER = "0x9cdd3da8aeb62804bea3545a0b1a390073348993";

module.exports = async done => {

    const EggTokenInstance = await EggToken.at("0xBc7D59A073517527979a157A3b40c5dCeD580fD9")
    const StakingInstance = await Staking.at("0x6Ff521Ab728a5a6459B27Bc457e325875C5f6E28")
    const VotingInstance = await Voting.at("0xD1213e8832dc462115824598BA5b8c5Fe014970F")
    const WithdrawableDistributionInstance = await WithdrawableDistribution.at("0xCD9338aDa8d03b2CD0b8bCEfbAA38bdD44A2453f")


    let contracts_deriving_ownable = [WithdrawableDistributionInstance, VotingInstance, StakingInstance]
    await Promise.all(
        contracts_deriving_ownable.map( async instance => await instance.transferOwnership(NEW_OWNER) )
    )

    await Promise.all(
        contracts_deriving_ownable.map(async (v) => {
            console.log(`owner ${await v.owner()}`)
            return {}
        })
    )

    // use try catch for txns

    done()

}
/*

 '{"value":{"code":-32603,"data":{"code":-32000,"message":"insufficient funds for gas * price + value"}}}'
 manually changed the gas to 6 and then used high gas , using 6 reset it i guess or something like that

*/

