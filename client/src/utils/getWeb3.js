import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'a7056621462747928bbed1ce1fbc4ade'
    }
  }
};

const getWeb3 = () => (
  new Promise(async(resolve, reject) => {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: false,
        providerOptions
      })
      web3Modal.clearCachedProvider()

      const provider = await web3Modal.connect()
      let web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      resolve({ web3, account })
    } catch(e){
      resolve(e)
    }
  })
);

export default getWeb3;
