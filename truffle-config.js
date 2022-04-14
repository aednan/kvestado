require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = process.env.MNEMONIC;
const infuraProjectId = process.env.INFURA_PROJECT_ID;

module.exports = {
  // See <https://trufflesuite.com/docs/truffle/reference/configuration/>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/contracts"),
  networks: {
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 3, // Ropsten's id
      gasLimit: 200000000000,
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 4,
      gas: 5500000,
      gasLimit: 200000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/${infuraProjectId}`
        );
      },
      network_id: 5,
      gas: 5500000,
      // to avoid error code -32603 : Failed gas estimation
      gasLimit: 200000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // * Match any network id. 5777 to match ganache network id
    },
  },
  compilers: {
    solc: {
      version: "^0.8.13",
      optimizer: {
        enabled: true,
        runs: 200, // Optimize for how many times you intend to run the code
      },
      // evmVersion: <string>, // Default: "istanbul"
    },
  },
};
