import React, { Component } from 'react';

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { styled } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import Paper from '@material-ui/core/Paper';
import style from '../assets/css/wallet';

const WalletBase = styled(Paper)(style);

class Wallet extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <WalletBase>
        <AccountBalanceWalletIcon className="icon"/>
        <span className="balances">
          <NumberFormat value={this.props.dai} displayType={'text'} thousandSeparator={true} /> DAI
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NumberFormat value={this.props.cura} displayType={'text'} thousandSeparator={true} /> CuraDAI
        </span>
      </WalletBase>
    );
  }
}

export default Wallet;
