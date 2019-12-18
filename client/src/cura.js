import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';

import Grid from '@material-ui/core/Grid';
import Modal from './components/modal';
import stock from './assets/css/stock';
import './assets/css/stock.css';

class Cura extends Component {
  constructor(props) {
    super(props)
      this.state = {
        phase: "Connect"
      }
  }

  componentDidMount = async() => {
    try {
      const provider = await getWeb3();
      const account = provider.accounts[0];
      const web3 = provider.web3;
      const phase = "Swap";

      this.setState({ phase, web3, account });
    } catch(e) { }
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center" style={stock}>
        <Grid item>
          <Modal phase={this.state.phase} />
        </Grid>
      </Grid>
    );
  }
}

export default Cura;
