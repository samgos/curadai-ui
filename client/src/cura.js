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
        phase: "Connect",
        market: "DAI"
      }
  }

  componentDidMount = () => {
    this.setStyle("DAI", true);
  }

  initialiseWeb3 = async() => {
    try {
      const provider = await getWeb3();
      const account = provider.accounts[0];
      const operation = this.approveTokens;
      const web3 = provider.web3;
      const phase = "Approve";

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
    const curaCall = await curaInstance.methods.balanceOf(account).call();
    const daiCall = await daiInstance.methods.balanceOf(account).call();
    const cura = await this.parseInput(curaCall);
    const dai = await this.parseInput(daiCall);

    this.setState({
      cura, dai
    });
  }

  swapTokens = async() => {
    const { account, market, exchange } = this.state;

    if(market === "DAI") {
      await this.mintCura(account, exchange);
    } else if(market === "CuraDAI"){
      await this.burnCura(account, exchange);
    } await this.getBalances();
  }

  approveTokens = async() => {
    const { market, exchange, curaInstance, daiInstance, account, web3 } = this.state;
    const contract = curaInstance.options.address;

    const instance = market === "DAI" ? daiInstance : curaInstance;

    await this.setState({ phase: "Pending..." });

    await new Promise((resolve, reject) =>
      instance.methods.approve(contract, exchange).send({
        from: account
      }).on('transactionHash',
      async(confirmationNumber, receipt) => {
          await this.getBalances();
          await this.setState({
            operation: this.swapTokens,
            phase: "Swap"
          }); resolve(receipt);
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  burnCura = async(account, amount) => {
    const { curaInstance } = this.state;

    await this.setState({ phase: "Pending..." });

    await new Promise((resolve, reject) =>
      curaInstance.methods.burn(amount).send({
        from: account
      }).on('transactionHash',
      async(confirmationNumber, receipt) => {
          await this.getBalances();
          await this.setState({
            operation: this.swapTokens,
            phase: "Swap"
          }); resolve(receipt);
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  mintCura = async(account, amount) => {
    const { curaInstance } = this.state;

    await this.setState({ phase: "Pending..." });

    await new Promise((resolve, reject) =>
      curaInstance.methods.mint(amount).send({
        from: account
      }).on('transactionHash',
      async(confirmationNumber, receipt) => {
          await this.getBalances();
          await this.setState({
            operation: this.swapTokens,
            phase: "Swap"
          }); resolve(receipt);
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  proofAllowance = async(_exchange) => {
    const { curaInstance, daiInstance, market, account, web3 } = this.state;
    const amount = await this.convertInput(_exchange);
    const contract = curaInstance.options.address;

    const instance = market === "DAI" ? daiInstance : curaInstance;
    const approval = await instance.methods.allowance(account, contract).call();
    const validity = parseInt(approval) >= parseInt(amount);

    await this.setState({
      exchange: amount
    }); return validity;
  }

  onChange = async(_value) => {
    await this.exchangeRate(_value);
    if(this.state.phase !== "Connect" && !isNaN(_value)){
      const approvalValidity = await this.proofAllowance(_value);

      if(approvalValidity){
        this.setState({
          operation: this.swapTokens,
          phase: "Swap"
        });
      } else {
        this.setState({
          operation: this.approveTokens,
          phase: "Approve"
        });
      }
    }
  }

  exchangeRate = async(_exchange) => {
    if(this.state.market === "CuraDAI") {
      var value = (parseFloat(_exchange)/parseFloat(1.78));
      value = value % 1 === 0 ? value : value.toFixed(2);
      this.setState({
        rate: value
      });
    } else if(this.state.market === "DAI"){
      var value = (parseFloat(_exchange)*parseFloat(1.75));
      value = value % 1 === 0 ? value : value.toFixed(2);
      this.setState({
        rate: value
      });
    }
  }

  convertInput = async(_amount) => {
    const { web3 } = this.state;

    if(_amount % 1 === 1) {
      return parseFloat(web3.utils.toBN(_amount).mul(
        web3.utils.toBN(1e18)
      )).toLocaleString('fullwide', {useGrouping:false});
    } else {
      return parseFloat((_amount)*Math.pow(10,18)
      ).toLocaleString('fullwide', {useGrouping:false});
    }
  }

  parseInput = async(_amount) => {
    return (parseFloat(_amount)/Math.pow(10,18)).toFixed(2).toString();
  }

  marketChange = (_market) => {
    const reset = _market === "DAI" ? "CuraDAI" : "DAI";

    this.setStyle(reset, false);
    this.setStyle(_market, true);

    this.setState({
      market: _market
    });
  }

  setStyle = (_element, _bool) => {
    const wrapper = document.getElementsByClassName(`logo-${_element}`)[0];
    const target = document.getElementsByClassName(_element)[0];

    if(_bool){
      target.style["border-radius"] = "75px";

      if(_element === "CuraDAI"){
        target.style.border = "solid 2px #ffffff";
      } else {
        target.style.border = "solid 3.575px #ffffff";
      }

      target.style.background = "#ffffff";
      wrapper.style.background = "#ffffff";
    } else {
      target.style["border-radius"] = "none";
      wrapper.style.background = "none";
      target.style.background = "none";
      target.style.border = "none";
    }
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center" style={stock}>
        <Grid item>
          <Modal
            operation={this.state.operation}
            marketChange={this.marketChange}
            stateChange={this.onChange}
            market={this.state.market}
            balances={this.getBalances}
            phase={this.state.phase}
            rate={this.state.rate}
            cura={this.state.cura}
            dai={this.state.dai}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Cura;
