
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

    const EggTokenInstance = await EggToken.at("0x6dd04Cf9D7221fEdd6a8008d1577F3aBBb011E1C")
    const StakingInstance = await Staking.at("0x2b0a3d4c8d7d39951e4bb7493f4aaa2c9d742236")
    const VotingInstance = await Voting.at("0x438d15c44c2873e2a1ac7f1969ae7c95ff361a1b")
    const WithdrawableDistributionInstance = await WithdrawableDistribution.at("0x7fa6e123998ee8b7cd05a108ab38acae495daf4d")


    let contracts_deriving_ownable = [EggTokenInstance, WithdrawableDistributionInstance, VotingInstance, StakingInstance]
    await Promise.all(
        contracts_deriving_ownable.map( async instance => await instance.transferOwnership(NEW_OWNER) )
    )

    await Promise.all(
        contracts_deriving_ownable.map(async (v) => {
            console.log(`owner ${await v.owner()}`)
            return {}
        })
    )

    // doesnt work on shitty polygon

    // use try catch for txns
    
    // try {
    //     const StakingInstance = await Staking.at("0x2b0a3d4c8d7d39951e4bb7493f4aaa2c9d742236")
    //     const x = await StakingInstance.getStakingOptions()
    //     console.log(`staking options : ${x[0][0]}`)
    // } catch (e) {
    //     console.log(`exception: ${e}`)
    // }


    done()

}
/*

 '{"value":{"code":-32603,"data":{"code":-32000,"message":"insufficient funds for gas * price + value"}}}'
 manually changed the gas to 6 and then used high gas , using 6 reset it i guess or something like that

*/

