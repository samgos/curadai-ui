pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract DummyDai is ERC20Detailed, ERC20 {

  using SafeMath for uint256;

  constructor(string memory _name, string memory _symbol) ERC20Detailed(_name, _symbol, 18) public {
    uint genesisReward = uint(100000).mul(10**18);
    _mint(msg.sender, genesisReward);
  }

}
