const CuraDai = artifacts.require("CuraDai");
const DummyDai = artifacts.require("DummyDai");

module.exports = async function(deployer) {
  const networkId = await web3.eth.net.getId();
  const accounts = await web3.eth.getAccounts();

  await deployer.deploy(DummyDai, "Dai", "DAI");

  const daiAddress = DummyDai.networks[networkId].address

  await deployer.deploy(CuraDai,
    "CuraDai", "CURA", daiAddress, accounts[0]
  );
};
