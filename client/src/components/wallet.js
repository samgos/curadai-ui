import React, { Component } from 'react';

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { styled } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import Paper from '@material-ui/core/Paper';
import style from '../assets/css/wallet';

const WalletBase = styled(Paper)(style);

function Wallet(props){
  return (
    <WalletBase>
      <AccountBalanceWalletIcon className="icon"/>
      <span className="balances">
        <NumberFormat value={props.dai} displayType={'text'} thousandSeparator={true} /> DAI
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NumberFormat value={props.cura} displayType={'text'} thousandSeparator={true} /> CuraDAI
       </span>
    </WalletBase>
  )
}

export default Wallet;
