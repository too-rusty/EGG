
const IERC20 = artifacts.require("IERC20")

const toWei = (amount) => web3.utils.toWei(amount, "ether")
const fromWei = (amount) => web3.utils.fromWei(amount, "ether")

const EGGTOKEN = "0x23d3A86d44b866a1d0c2179B62CF33551DBe9665"
const STAKING = "0x0a16D9e8F9b92E0553E4f15548BFC38C36861a3E"

module.exports = async done => {

    const [admin,_] = await web3.eth.getAccounts()
    console.log(`admin addr: ${admin}`)

    const ierc20 = await IERC20.at(EGGTOKEN)
    await ierc20.approve(STAKING, ("1000000000000000000000000")) // allowing max
    const allow = fromWei(await ierc20.allowance("0x405b3cA1047C933F8d0714009Bfa43B5F1DA6376", STAKING))
    console.log("allowance", allow)
    // await ierc20.transfer("0x0221A018A6743474268a9a03e8fB17D811AF684D",53457916)    
console.log(`balance of owner: ${(await ierc20.balanceOf(admin))}`)

// 0x0221A018A6743474268a9a03e8fB17D811AF684D the other address
    done()

}

/*
polygon testnet addresses

weth':'0x462C98Cae5AffEED576c98A55dAA922604e2D875',
'uniswapFactory':'0x69004509291F4a4021fA169FafdCFc2d92aD02Aa',
'uniswapRouter':'0xbdd4e5660839a088573191A9889A262c0Efc0983',
*/



/*
for wbnb we need to deposit bnb to wbnb contract on testnet !!!
connected to metamask and did it manually, another way is to use web3 and contract abi to connect !
interface did not work for some reason !! ( actually i used contract and not interface , that might be the issue )
*/