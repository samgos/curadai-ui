import Web3 from "web3";

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          // Acccounts now exposed
          resolve({
            web3, accounts
          });
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        console.log("Injected web3 detected.");
        resolve({
          web3, accounts
        });
      }
  });

export default getWeb3;
