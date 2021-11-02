
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

const mnemonic = process.env.MNEMONIC
const url = process.env.MUMBAI_RPC_URL
const ftmApiKey = process.env.FTM_API_KEY
const polygonApiKey = process.env.POLYGON_API_KEY
// https://rinkeby.infura.io/v3/<PROJECT-ID> // for interacting with rinkeby chain

module.exports = {
  /**
   * $ truffle test --network <network-name>
   */
  plugins: ["truffle-plugin-verify"],
  // npm install -D truffle-plugin-verify
  api_keys: {
    // etherscan: polygonApiKey,
    polygonscan: polygonApiKey,
    ftmscan: ftmApiKey,
  },
  // google truffle run verify node npm package ot understand

  networks: {
    development: {
    provider: () => new HDWalletProvider(mnemonic, 'http://127.0.0.1:8545'),
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    }, // start ganache-cli before this and set env MNEMONIC
    bsc_testnet: {
      provider: () => new HDWalletProvider(mnemonic,'https://data-seed-prebsc-1-s1.binance.org:8545'),
      network_id: 97,
      // confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, url)
      },
      network_id: '4',
      skipDryRun: true
    },
    ftm_testnet: {
      //  https://rpcapi.fantom.network for mainnet
      provider: () => new HDWalletProvider(mnemonic,'https://rpc.testnet.fantom.network/'),
      network_id: 4002, // as seen in error message
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    ftm_mainnet: {
      provider: () => new HDWalletProvider(mnemonic,'https://rpc.ftm.tools'),
      network_id: 250, // as seen in error message
      confirmations: 3,
      timeoutBlocks: 200,
      skipDryRun: true,
      // gas: 2000000,
      // gasPrice: 50000000000,
    },
    // ** truffle run verify EggToken  --network ftm_mainnet  # command to verify on mainnet **

    matic_mumbai: {
      // matic mumbai testnet
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },



    matic_mainnet: {
      // matic mumbai testnet
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-rpc.com`),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 10000, // was 500 before
      skipDryRun: true,
      gas: 20000000,
      gasPrice: 50000000000, // 1 eth is the max
    },
    // ERROR : Too many requests , try increasing the number of confirmations or deploy 1 at a time
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.7.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

};


/*
truffle migrate --network ftm_mainnet --reset -f 2  # migrates all contracts starting from this deployment number

*/

/*
Polygon mainnet URLs
--------------------
New RPC URL: https://polygon-rpc.com or

https://rpc-mainnet.matic.network or

https://rpc-mainnet.maticvigil.com or

https://rpc-mainnet.matic.quiknode.pro

ChainID: 137
*/