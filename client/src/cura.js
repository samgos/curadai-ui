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
      const operation = this.swapTokens;
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

  render() {
    return (
      <Grid container justify="center" alignItems="center" style={stock}>
        <Grid item>
          <Modal
            operation={this.state.operation}
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
