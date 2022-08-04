// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
contract BlockCard is Initializable,UUPSUpgradeable,OwnableUpgradeable {
    struct Person{
    string  name;
    string  gender;
    uint  age;
    string  bloodgroup;
    string  DOB;

    }
    Person person; 
    function initialize(string calldata _name) initializer  public{
     setName(_name);  
    }
    function getname() public view returns(string memory){
        return person.name;
    }
    
    function setName(string calldata _name) public {
        person.name=_name;
    }
    function setGender(string calldata _gender) public {
        person.gender=_gender;
    }
    function setAge(uint _age) public {
        person.age=_age;
    }
    function setBloodgroup(string calldata _bloodgroup) public {
        person.bloodgroup=_bloodgroup;
    }
    function setDOB(string calldata _DOB) public{
        person.DOB=_DOB;
    }

    //UUPS
        function _authorizeUpgrade(address newImplementation)internal override onlyOwner{}
    
}