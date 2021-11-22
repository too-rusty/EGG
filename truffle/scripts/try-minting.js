const ERC20Mintable = artifacts.require("ERC20Mintable")
const ERC20 = artifacts.require("ERC20")

module.exports = async done => {
    const admin = (await web3.eth.getAccounts())[0]
    console.log(`admin ${admin}`)
    const mintable = await ERC20Mintable.at("0x6E1ABaeF25dF0a82cd8af9D449607E5E9EA72Dbc")
    const token = await ERC20.at("0x6E1ABaeF25dF0a82cd8af9D449607E5E9EA72Dbc")
    let total = web3.utils.fromWei(await token.totalSupply(), 'ether')
    console.log(`totalSupply before calling mint : ${total}\n`)
    
    try {
    const tx = await mintable.mint.call(admin, web3.utils.toWei('10000', 'ether'))
    console.log("transaction", tx)
    } catch (e) {
    console.log("err", e.message)
    }
    
    total = web3.utils.fromWei(await token.totalSupply(), 'ether')
    console.log(`\ntotalSuppy after calling mint : ${total}\n`)
    console.log(`my balance: ${await token.balanceOf(admin)} `)
    done()
}