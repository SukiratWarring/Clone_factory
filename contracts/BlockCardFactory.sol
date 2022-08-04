// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "./BlockCard.sol";
import "./CloneFactory.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
contract BlockCardFactory is Initializable,CloneFactory,OwnableUpgradeable,UUPSUpgradeable{
    address public BlockCardAddress;
    address[] public clonedcontracts;

    event BlockCardCreated(address newBlockCard);

    function initialize( address _recardAddress) initializer  public{
        BlockCardAddress=_recardAddress;
    }
    function createBlockCard(string memory name) public {
        address clone=createClone(BlockCardAddress);
        BlockCard(clone).initialize(name);
        clonedcontracts.push(clone);
        emit BlockCardCreated(clone);
    }
    function getAddress(uint i) view external returns(address){
        return clonedcontracts[i];
    }
//UUPS
        function _authorizeUpgrade(address newImplementation)internal override onlyOwner{}
}