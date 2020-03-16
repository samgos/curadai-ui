import React, { useRef, useEffect, useState, useContext, Fragment } from 'react'
import getWeb3 from './utils/getWeb3'

import { CURADAI_ADDRESS, DAI_ADDRESS } from './constants/contracts'
import ALERT from './constants/alerts'
import OP from './utils/operations'

import Grid from '@material-ui/core/Grid'
import Modal from './components/modal'
import Alert from './components/alert'

import { store } from './state'

function Exchange(props){
  const [ modalContent, setContent ] = useState({ title: "", body: "", button: true })
  const [ exchangeBalance, setBalances ] = useState({ cura: 0, dai: 0 })
  const [ exchangePhase, setPhase ] = useState("Connect")
  const [ exchangeMarket, setMarket ] = useState("DAI")
  const [ exchangeAmount, setExchange ] = useState(0)
  const [ exchangeRate, setRate ] = useState(1.75)
  const [ modalAlert, setAlert ] = useState(false)

  let { state, dispatch } = useContext(store)
  let curaRef = useRef(1.78)
  let daiRef = useRef(1)

  const initialiseWeb3 = async() => {
    try {
      const provider = await getWeb3()
      let { web3, account } = provider

      const cura = await OP.contractInstance(web3, CURADAI_ADDRESS)
      const dai = await OP.contractInstance(web3, DAI_ADDRESS)
      const network = await web3.eth.net.getId()

      await dispatch({ payload: {
          dai, cura, account, web3, network
        }, type: 'WEB3'
      })
      setPhase('Approve')
    } catch(e) {
      alert('Web3 provider could not be found')
    }
  }

  const getBalances = async() => {
    const curaCall = await state.cura.methods.balanceOf(state.account).call()
    const daiCall = await state.dai.methods.balanceOf(state.account).call()
    const curaBalance = await OP.parseInput(curaCall)
    const daiBalance = await OP.parseInput(daiCall)

    setBalances({
      cura: curaBalance, dai: daiBalance
    })
  }

  const swapTokens = async() => {
    switch(exchangeMarket){
      case "CuraDAI":
        await burnCura()
      case "DAI":
        await mintCura()
    }
    await getBalances()
  }

  const approveTokens = async() => {
    let { cura, dai, account, web3 } = state
    const contract = cura.options.address

    const instance = exchangeMarket === "DAI" ? dai : cura

    setPhase("Pending...")

    await new Promise((resolve, reject) =>
      instance.methods.approve(contract, exchangeAmount).send({
        from: account
      }).on('confirmation', (confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          setPhase("Swap")
          resolve(receipt)
        }
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  const burnCura = async(account, amount) => {
    setPhase("Pending...")

    await new Promise((resolve, reject) =>
      state.cura.methods.burn(amount).send({
        from: account
      }).on('confirmation', (confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          setPhase("Swap")
          resolve(receipt)
        }
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  const mintCura = async(account, amount) => {
    setPhase("Pending...")

    await new Promise((resolve, reject) =>
      state.cura.methods.mint(amount).send({
        from: account
      }).on('confirmation', (confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          setPhase("Swap")
          resolve(receipt)
        }
      }).on('error', (error) => {
        reject(error)
      })
    );
  }

  const proofAllowance = async(_exchange) => {
    const { cura, dai, account, web3 } = state
    const amount = await convertInput(_exchange)
    const contract = cura.options.address

    const instance = exchangeMarket === "DAI" ? dai : cura
    const approval = await instance.methods.allowance(account, contract).call()
    const validity = parseInt(approval) >= parseInt(amount)

    setExchange(amount)
    return validity
  }

  const onChange = async(_exchange) => {
    await discoverRate(_exchange)
    if(exchangePhase !== "Connect" && !isNaN(_exchange)){
      const approvalValidity = await proofAllowance(_exchange)

      if(approvalValidity) setPhase("Swap")
      else setPhase("Approve")
    }
  }

  const discoverRate = async(_exchange) => {
    if(exchangeMarket === "CuraDAI") {
      var value = (parseFloat(_exchange.target.value)/parseFloat(1.78));
      value = value % 1 === 0 ? value : value.toFixed(2);
      setRate(value)
    } else if(exchangeMarket === "DAI"){
      var value = (parseFloat(_exchange.target.value)*parseFloat(1.75));
      value = value % 1 === 0 ? value : value.toFixed(2);
      setRate(value)
    }
  }

  const convertInput = async(_amount) => {
    if(_amount % 1 === 1) {
      return parseFloat(state.web3.utils.toBN(_amount).mul(
        state.web3.utils.toBN(1e18)
      )).toLocaleString('fullwide', { useGrouping:false });
    } else {
      return parseFloat((_amount)*Math.pow(10,18)
      ).toLocaleString('fullwide', { useGrouping:false });
    }
  }

  const marketChange = (_market) => {
    const reset = _market === "DAI" ? "CuraDAI" : "DAI";

    setStyle(reset, false);
    setStyle(_market, true);

    setMarket(_market)
  }

  const setStyle = (_element, _bool) => {
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

  const buttonOperation = () => {
    switch(exchangePhase){
      case "Approve":
        approveTokens()
      case "Swap":
        swapTokens()
      default:
        return initialiseWeb3()
    }
  }

  const triggerInfo = async() => {
    setContent({
      title:  ALERT.INFO_TITLE,
      body: ALERT.INFO_BODY,
      button: true
    })
    openModal()
  }

  const openModal = () => {
    setAlert(true)
  }

  const closeModal = () => {
    setAlert(false)
  }

  useEffect(() => {
    setStyle("DAI", true)
  }, [])

  return (
     <Fragment>
        <Modal
          infoTrigger={triggerInfo}
          operation={buttonOperation}
          marketChange={marketChange}
          stateChange={onChange}
          market={exchangeMarket}
          balances={getBalances}
          phase={exchangePhase}
          rate={exchangeRate}
          cura={exchangeBalance.cura}
          dai={exchangeBalance.dai}
          curaRef={curaRef}
          daiRef={daiRef}
        />
        <Alert
          trigger={modalAlert}
          bodyTitle={modalContent.title}
          bodyText={modalContent.body}
          buttonState={modalContent.button}
          openModal={openModal}
          closeModal={closeModal}
        />
     </Fragment >
   )
}

export default Exchange;
