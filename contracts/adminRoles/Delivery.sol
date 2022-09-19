// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Roles.sol";

contract Delivery {
  using Roles for Roles.Role;

  event DeliveryAdded(address indexed _account);
  event DeliveryRemoved(address indexed _account);

  Roles.Role private deliveryList;

  constructor() public {
    deliveryList.addRole(msg.sender);
    emit DeliveryAdded(msg.sender);
  }

  ///@dev Modifiers for Delivery.
  modifier onlyDelivery() {
    require(isDelivery(msg.sender), "");
    _;
  }
  /*-----------------------------*/

  ///@dev Delivery Utility functions.
  function isDelivery(address _account) public view returns (bool) {
    return deliveryList.hasRole(_account);
  }

  function addDelivery(address _account) public onlyDelivery {
    deliveryList.addRole(_account);
    emit DeliveryAdded(_account);
  }

  function removeDelivery() public {
    deliveryList.removeRole(msg.sender);
    emit DeliveryRemoved(msg.sender);
  }
  /*-----------------------------*/

}
