
const IERC20 = artifacts.require("IERC20")
const EggToken = artifacts.require("EggToken");
const toWei = (amount) => web3.utils.toWei(amount, "ether")
const fromWei = (amount) => web3.utils.fromWei(amount, "ether")

const EGGTOKEN = "0x23d3A86d44b866a1d0c2179B62CF33551DBe9665"
const STAKING = "0x0a16D9e8F9b92E0553E4f15548BFC38C36861a3E"

module.exports = async done => {

//     const [admin,_] = await web3.eth.getAccounts()
//     console.log(`admin addr: ${admin}`)

//     const ierc20 = await IERC20.at(EGGTOKEN)
//     await ierc20.approve(STAKING, ("1000000000000000000000000")) // allowing max
//     const allow = fromWei(await ierc20.allowance("0x405b3cA1047C933F8d0714009Bfa43B5F1DA6376", STAKING))
//     console.log("allowance", allow)
//     // await ierc20.transfer("0x0221A018A6743474268a9a03e8fB17D811AF684D",53457916)    
// console.log(`balance of owner: ${(await ierc20.balanceOf(admin))}`)

// 0x0221A018A6743474268a9a03e8fB17D811AF684D the other address

    const egg = await EggToken.at("0xCD9338aDa8d03b2CD0b8bCEfbAA38bdD44A2453f")
    console.log(`owner before: ${await egg.owner()}`)
    await egg.transferOwnership("0x9cdd3da8aeb62804bea3545a0b1a390073348993")
    console.log(`owner after: ${await egg.owner()}`)

    done()

}
/*

 '{"value":{"code":-32603,"data":{"code":-32000,"message":"insufficient funds for gas * price + value"}}}'
 manually changed the gas to 6 and then used high gas , using 6 reset it i guess or something like that

*/


// const Burning = artifacts.require("Burning");
// const Staking = artifacts.require("Staking");
// const Voting = artifacts.require("Voting");
// const WithdrawableDistribution = artifacts.require("WithdrawableDistribution");
