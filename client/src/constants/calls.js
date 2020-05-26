const DAI_PEGGED = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x6b175474e89094c44da98b954eedeac495271d0f&address=0x0a4b2d4b48a63088e0897a3f147ba37f81a27722&tag=latest&apikey=5HPMW9M7DTMYBGP9IXR2M8JNUGEM2HNNDI';
const TOKEN_METADATA = 'https://api.ethplorer.io/getTokenInfo/0x0a4b2d4b48a63088e0897a3f147ba37f81a27722?apiKey=freekey';

export default async function fetchStats() {
  const CURA = await fetch(TOKEN_METADATA).then(res => res.json())
  const DAI = await fetch(DAI_PEGGED).then(res => res.json())

  console.log(CURA)

  return {
    CURA: parseInt(parseFloat(CURA.totalSupply)/Math.pow(10, 18)).toLocaleString(),
    DAI: parseInt(parseFloat(DAI.result)/Math.pow(10, 18)).toLocaleString(),
    USERS: parseInt(CURA.holdersCount).toLocaleString()
  }
}
