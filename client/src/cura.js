import React, { Component, Fragment } from 'react';
import getWeb3 from './utils/getWeb3';

import { CURADAI_ADDRESS, DAI_ADDRESS } from './constants/contracts';
import CuraDai from './contracts/CuraDai.json';
import ERC20 from './contracts/ERC20.json';
import ALERT from './constants/alerts';
import OP from './utils/operations';

import Grid from '@material-ui/core/Grid';
import Modal from './components/modal';
import Alert from './components/alert';
import stock from './assets/css/stock';
import './assets/css/stock.css';

class Cura extends Component {
  constructor(props) {
    super(props)
      this.state = {
        operation: this.initialiseWeb3,
        phase: "Connect",
        alert: false,
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

      const networkId = await web3.eth.net.getId();

      if(networkId === 4){

        const curaInstance = await OP.contractInstance(web3, CuraDai, CURADAI_ADDRESS);
        const daiInstance = await OP.contractInstance(web3, ERC20, DAI_ADDRESS);

        await this.setState({
          daiInstance, curaInstance, operation, account, phase, web3
        }, async() => await this.getBalances());
     } else {
       await this.setState({
         title:  ALERT.NETWORK_TITLE,
         body: ALERT.NETWORK_BODY,
         button: false
       }, this.openModal());
     }
   } catch(e){
      await this.setState({
        title:  ALERT.WEB3_TITLE,
        body: ALERT.WEB3_BODY,
        button: false
      }, this.openModal());
    }
  }

  getBalances = async() => {
    const { curaInstance, daiInstance, account } = this.state;
    const curaCall = await curaInstance.methods.balanceOf(account).call();
    const daiCall = await daiInstance.methods.balanceOf(account).call();
    const cura = await OP.parseInput(curaCall);
    const dai = await OP.parseInput(daiCall);

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
      }).on('confirmation',
      async(confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          await this.getBalances();
          await this.setState({
            operation: this.swapTokens,
            phase: "Swap"
          }); resolve(receipt);
        }
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
      }).on('confirmation',
      async(confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          await this.getBalances();
          await this.setState({
            operation: this.swapTokens,
            phase: "Swap"
          }); resolve(receipt);
        }
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
      }).on('confirmation',
      async(confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          await this.getBalances();
          await this.setState({
            operation: this.swapTokens,
            phase: "Swap"
          }); resolve(receipt);
        }
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
        target.style.border = "solid 3.525px #ffffff";
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

  triggerInfo = async() => {
    await this.setState({
      title:  ALERT.INFO_TITLE,
      body: ALERT.INFO_BODY,
      button: true
    }, this.openModal());
  }

  openModal = () => {
    this.setState({
      alert: true
    })
  }

  closeModal = () => {
    this.setState({
      alert: false
    })
  }

  render() {
    return (
     <Fragment>
      <Grid container justify="center" alignItems="center" style={stock}>
        <Grid item>
          <Modal
            infoTrigger={this.triggerInfo}
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
      <Alert
        trigger={this.state.alert}
        bodyTitle={this.state.title}
        bodyText={this.state.body}
        buttonState={this.state.button}
        openModal={this.openModal}
        closeModal={this.closeModal}
        />
    </Fragment >
    );
  }
}

export default Cura;
