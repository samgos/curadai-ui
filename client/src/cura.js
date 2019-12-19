import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';

import { contractInstance } from './utils/operations';
import DummyDai from './contracts/DummyDai.json';
import CuraDai from './contracts/CuraDai.json';

import Grid from '@material-ui/core/Grid';
import Modal from './components/modal';

import stock from './assets/css/stock';
import './assets/css/stock.css';

class Cura extends Component {
  constructor(props) {
    super(props)
      this.state = {
        operation: this.initialiseWeb3,
        phase: "Connect"
      }
  }

  initialiseWeb3 = async() => {
    try {
      const provider = await getWeb3();
      const account = provider.accounts[0];
      const operation = this.approveTokens;
      const web3 = provider.web3;
      const phase = "Swap";

      // Not needed for main-net/rinkeby deployments
        const networkId = await web3.eth.net.getId();
        const curaAddress = CuraDai.networks[networkId].address;
        const daiAddress = DummyDai.networks[networkId].address;
      //

      const daiInstance = await contractInstance(web3, DummyDai, daiAddress);
      const curaInstance = await contractInstance(web3, CuraDai, curaAddress);

      await this.setState({
       daiInstance, curaInstance, operation, account, phase, web3
     }, async() => await this.getBalances());
    } catch(e){}
  }

  getBalances = async() => {
    const { curaInstance, daiInstance, account } = this.state;
    const cura = await curaInstance.methods.balanceOf(account).call();
    const dai = await daiInstance.methods.balanceOf(account).call();

    this.setState({
      cura, dai
    });
  }

  swapTokens = async() => {
    const { market, exchange, curaInstance, daiInstance, account, web3 } = this.state;
    const contract = curaInstance.options.address;

    const instance = market === "DAI" ? daiInstance : curaInstance;
    const approval = await instance.methods.allowance(account, contract).call();
    const amount = web3.utils.toBN(exchange).mul(web3.utils.toBN(1e18)).toString();

    if(parseInt(approval) >= parseInt(amount)){
      if(market === "DAI") {
        await this.mintCura(account, amount);
      } else if(market === "CuraDAI"){
        await this.mintCura(account, amount);
      } await this.getBalances();
    }
  }

  approveTokens = async() => {
    const { market, exchange, curaInstance, daiInstance, account, web3 } = this.state;
    const contract = curaInstance.options.address;

    const instance = market === "DAI" ? daiInstance : curaInstance;
    const amount = web3.utils.toBN(exchange).mul(web3.utils.toBN(1e18)).toString();

    return new Promise((resolve, reject) =>
      instance.methods.approve(contract, amount).send({
        from: account
      }).on('confirmation',
      (confirmationNumber, receipt) => {
        resolve(receipt)
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  burnCura = (account, amount) => {
    const { curaInstance } = this.state;
    return new Promise((resolve, reject) =>
      curaInstance.methods.burn(`${amount}`).send({
        from: account
      }).on('confirmation',
      (confirmationNumber, receipt) => {
        resolve(receipt)
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  mintCura = (instance, account, amount) => {
    const { curaInstance } = this.state;
    return new Promise((resolve, reject) =>
      curaInstance.methods.mint(`${amount}`).send({
        from: account
      }).on('confirmation',
      (confirmationNumber, receipt) => {
        resolve(receipt)
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  onChange = (_event, _asset) => {
    this.setState({
      exchange: _event.target.value,
      market: _asset
    });
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center" style={stock}>
        <Grid item>
          <Modal
            operation={this.state.operation}
            stateChange={this.onChange}
            balances={this.getBalances}
            phase={this.state.phase}
            cura={this.state.cura}
            dai={this.state.dai}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Cura;
