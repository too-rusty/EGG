const EggToken = artifacts.require("EggToken");
const Burning = artifacts.require("Burning");
const Staking = artifacts.require("Staking");
const Voting = artifacts.require("Voting");
const WithdrawableDistribution = artifacts.require("WithdrawableDistribution");

module.exports = async done => {

    const WithDrawableInstance = await WithdrawableDistribution.at("0x42A0643b75DdE63185F894C3B0E2a5A3aEe8827e")
    const EggTokenInstance = await EggToken.at("0x79C629A719604e78a93cD6A395c8A08046AfecDd")
    const VotingInstance = await Voting.at("0x80091EB8cf2CD89A477c47469c79014f6911Fe30")
    const StakingInstance = await Staking.at("0x2c3D16e8c2602deA92E281dCc7FC6B14C75128dB")

    let contracts_deriving_ownable = [WithDrawableInstance, VotingInstance, StakingInstance, EggTokenInstance]
    let contracts_deriving_ownable_string = ["WithDrawableInstance", "VotingInstance", "StakingInstance", "EggTokenInstance"]
    
    try {
        await Promise.all(
            contracts_deriving_ownable.map( async (instance) => {
                console.log(await instance.owner())
                // console.log(instance.address)
            } )
        )
    } catch (e) {
        console.log(e)
    }


    done()
}