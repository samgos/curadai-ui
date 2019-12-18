import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
      const web3 = provider.web3;
      const phase = "Swap";

      await this.setState({
       account, phase, web3
     });
   } catch(e){}
  }

  getBalances = async() => {


  }

  render() {
    return (
      <Grid container justify="center" alignItems="center" style={stock}>
        <Grid item>
          <Modal
            operation={this.state.operation}
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
