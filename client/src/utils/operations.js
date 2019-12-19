async function contractInstance(web3, contractJSON, address) {
  return await new web3.eth.Contract(contractJSON.abi, address);
}

const parseInput = async(_amount) => {
  return (parseFloat(_amount)/Math.pow(10,18)).toFixed(2).toString();
}

export default {
  contractInstance,
  parseInput
};
