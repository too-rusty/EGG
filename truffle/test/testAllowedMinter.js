const EGG = artifacts.require("EggToken")

contract("Something", async accounts => {
    let egg;
    beforeEach(async () => {
        egg = await EGG.new("EggToken", "Egg", "1000000")
    })

    it("Should be deployed", async () => {
        // const owner = await web3.eth.getAccounts()[0]
        const symbol = await egg.symbol()
        assert(symbol === "Egg")
    })

})