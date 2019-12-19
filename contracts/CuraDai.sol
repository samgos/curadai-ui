pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// TODO add permit of MCD

contract CuraDai is ERC20Detailed, ERC20 {

  using SafeMath for uint256;

  uint256 public constant burnPrice = 1780000000000000000; // 1.78
  uint256 public constant mintPrice = 1750000000000000000; // 1.75
  IERC20 public underlying; // DAI
  address public benificiary; // Address receiving the spread


  constructor(string memory _name, string memory _symbol, IERC20 _underlying, address _benificiary) ERC20Detailed(_name, _symbol, 18) public {
    underlying = _underlying;
    benificiary = _benificiary;
  }

  function mint(uint256 _underlyingAmount) external returns(uint256) {
    // Pull tokens
    underlying.transferFrom(msg.sender, address(this), _underlyingAmount);
    // Calculate amount to mint
    uint256 mintAmount = _underlyingAmount.mul(mintPrice).div(10**18);
    // Mint tokens (at the end of the transaction to prevent reentry)
    _mint(msg.sender, mintAmount);
    return mintAmount;
  }

  function burn(uint256 _burnAmount) external returns(uint256) {
    // Burn tokens at the start to prevent reentry
    _burn(msg.sender, _burnAmount);
    // Calculate the amount of underlying to return
    uint256 underlyingAmount = _burnAmount.mul(10**18).div(burnPrice);
    // Send underlying tokens to msg.sender
    underlying.transfer(msg.sender, underlyingAmount);
    return underlyingAmount;
  }

  // Pulls the spread. We pull it in batches to lower gas costs for end users.
  function pullSpread() external returns(uint256) {
    // Spread equals balance of minus the amount of underlying that should be in the contract in the case of a full bankrun
    uint256 spread = underlying.balanceOf(address(this)).sub(this.totalSupply().mul(burnPrice).div(10**18));
    // Transfer the spread
    underlying.transfer(msg.sender, spread);
    return spread;
  }
}
