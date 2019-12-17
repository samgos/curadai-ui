import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import './assets/css/dApp.css';

class Cura extends Component {
  constructor(props) {
    super(props)
      this.state = {}
  }

  componentDidMount = async() => {
    try {
      const provider = await getWeb3();
      const account = provider.accounts[0];
      const web3 = provider.web3;

      this.setState({ web3, account });
    } catch(e) { }
  }

  render() {
    return (
      <div className='dApp'>
      Henlo
      {this.state.account}
      </div>
    );
  }
}

export default Cura;
