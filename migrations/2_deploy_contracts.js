var SupplyChainContract = artifacts.require("./SupplyChain.sol");
var RolesContract = artifacts.require("./adminRoles/Roles.sol")
var ManufacturerContract = artifacts.require("./adminRoles/Manufacturer.sol");

module.exports = function(deployer) {
  deployer.deploy(ManufacturerContract);
  deployer.deploy(RolesContract);
  deployer.deploy(SupplyChainContract, {gas: 15555555});
};
