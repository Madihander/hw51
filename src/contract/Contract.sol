// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;
contract HelloContract {
    uint256 number;
    string str;
    uint256[] nums;

    function setNumber(uint256 _number) public {
        number = _number;
    }
    function setStr(string memory _str) public {
        str = _str;
    }
    function pushNumber(uint256 _number) public {
        nums.push(_number);
    }

    function getNumber() public view returns(uint256){
        return number;
    }

    function getStr() public view returns(string memory){
        return str;
    }

    function getNumberFormArray(uint256 index) public view returns(uint256){
        return nums[index];
    }

}