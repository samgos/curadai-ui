
const parseInput = async(_amount) => {
  return (parseFloat(_amount)/Math.pow(10,18)).toFixed(2).toString();
}

module.exports = {
  parseInput
}
