async function contractInstance(web3, contractJSON, address) {
  return await new web3.eth.Contract(contractJSON.abi, address);
}

module.exports = {
  contractInstance
}
