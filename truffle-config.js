const path = require("path");
require("dotenv").config;
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <https://trufflesuite.com/docs/truffle/reference/configuration/>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/contracts"),
  networks: {
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          "input globe skill black save bless wet pig shallow rhythm catch pink",
          `https://rinkeby.infura.io/v3/03926cf21c0c424c91ea4e0ed9bbf368`
        );
      },
      // gasPrice: "20000000000",
      network_id: "4",
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // * Match any network id. 5777 to match ganache network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.11",
    },
  },
};
