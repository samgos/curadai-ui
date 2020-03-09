import CuraDai from '../contracts/CuraDai.json'
import ERC20 from '../contracts/ERC20.json'

import { CURADAI_ADDRESS, DAI_ADDRESS } from '../constants/contracts'

async function contractInstance(web3, address, contractJSON) {
  if(address == CURADAI_ADDRESS) contractJSON = CuraDai
  else if(address == DAI_ADDRESS) contractJSON = ERC20
  return await new web3.eth.Contract(contractJSON.abi, address);
}

const parseInput = async(_amount) => {
  return (parseFloat(_amount)/Math.pow(10,18)).toFixed(2).toString();
}

export default {
  contractInstance,
  parseInput
};
