const DAI_PEGGED = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x6b175474e89094c44da98b954eedeac495271d0f&address=0x0a4b2d4b48a63088e0897a3f147ba37f81a27722&tag=latest&apikey=5HPMW9M7DTMYBGP9IXR2M8JNUGEM2HNNDI';
const TOKEN_SUPPLY = 'https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x0a4b2d4b48a63088e0897a3f147ba37f81a27722&apikey=5HPMW9M7DTMYBGP9IXR2M8JNUGEM2HNNDI';

export default async function fetchStats() {
  const DAI = await fetch(DAI_PEGGED).then(res => res.json())
  const CURA = await fetch(TOKEN_SUPPLY).then(res => res.json())

  return {
    DAI: parseInt(parseFloat(DAI.result)/Math.pow(10, 18)).toLocaleString(),
    CURA: parseInt(parseFloat(CURA.result)/Math.pow(10, 18)).toLocaleString()
  }
}
