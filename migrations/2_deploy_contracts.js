var Kvestado = artifacts.require("./Kvestado.sol");
// deployer, network, accounts
module.exports = function (deployer) {
  deployer.deploy(Kvestado);
};
