import React, { useRef, useEffect, useState, useContext, useCallback, Fragment } from 'react'
import getWeb3 from './utils/getWeb3'

import { CURADAI_ADDRESS, DAI_ADDRESS } from './constants/contracts'
import ALERT from './constants/alerts'
import OP from './utils/operations'

import Grid from '@material-ui/core/Grid'
import Modal from './components/modal'

import { store } from './state'

function Exchange(props){
  const [ exchangeBalance, setBalances ] = useState({ cura: 0, dai: 0 })
  const [ exchangePhase, setPhase ] = useState("Connect")
  const exchangeMarket = useRef("DAI")
  const exchangeAmount = useRef(0)
  const [curaRef, setCura] = useState(null)
  const [daiRef, setDai] = useState(null)

  let { state, dispatch } = useContext(store)

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
      await getBalances(cura, dai, account)
      setPhase('Approve')
    } catch(e) {
      alert('Web3 provider could not be found')
    }
  }

  const getBalances = async(_cura, _dai, _account) => {
    const curaCall = await _cura.methods.balanceOf(_account).call()
    const daiCall = await _dai.methods.balanceOf(_account).call()
    const curaBalance = await OP.parseInput(curaCall)
    const daiBalance = await OP.parseInput(daiCall)

    setBalances({
      cura: curaBalance, dai: daiBalance
    })
  }

  const swapTokens = async() => {
    switch(exchangeMarket.current){
      case "CuraDAI":
        return await burnCura()
      case "DAI":
        return await mintCura()
    }
    await getBalances(state.cura, state.dai, state.account)
  }

  const approveTokens = async() => {
    let { cura, dai, account, web3 } = state
    const contract = cura.options.address

    const instance = exchangeMarket.current === "DAI" ? dai : cura

    setPhase("Pending...")

    await new Promise((resolve, reject) =>
      instance.methods.approve(contract, exchangeAmount.current).send({
        from: account
      }).on('confirmation', (confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          setPhase("Swap")
          resolve(receipt)
        }
      }).on('error', (error) => {
        setPhase("Approve")
        reject(error)
      })
    );
  }

  const burnCura = async() => {
    setPhase("Pending...")

    await new Promise((resolve, reject) =>
      state.cura.methods.burn(exchangeAmount.current).send({
        from: state.account
      }).on('confirmation', (confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          setPhase("Swap")
          resolve(receipt)
        }
      }).on('error', (error) => {
        setPhase("Approve")
        reject(error)
      })
    );
  }

  const mintCura = async() => {
    setPhase("Pending...")

    await new Promise((resolve, reject) =>
      state.cura.methods.mint(exchangeAmount.current).send({
        from: state.account
      }).on('confirmation', (confirmationNumber, receipt) => {
        if(confirmationNumber === 1){
          setPhase("Swap")
          resolve(receipt)
        }
      }).on('error', (error) => {
        setPhase("Approve")
        reject(error)
      })
    );
  }

  const proofAllowance = async(_exchange) => {
    const { cura, dai, account, web3 } = state
    const amount = await convertInput(_exchange.target.value)
    const contract = cura.options.address

    const instance = exchangeMarket.current === "DAI" ? dai : cura
    const approval = await instance.methods.allowance(account, contract).call()
    const validity = parseInt(approval) >= parseInt(amount)
    exchangeAmount.current = amount

    return validity
  }

  const onChange = async(_exchange) => {
    if(!isNaN(_exchange.target.value)){
      await discoverRate(_exchange)

      if(exchangePhase !== "Connect"){
        const validity = await proofAllowance(_exchange)

        if(validity) setPhase("Swap")
        else if(!validity) setPhase("Approve")
      }
    }
  }

  const discoverRate = async(_exchange) => {
    if(exchangeMarket.current === "CuraDAI") {
      var value = (parseFloat(_exchange.target.value)/parseFloat(1.78)).toFixed(2)
      setCura(_exchange.target.value)
      setDai(value)
    } else if(exchangeMarket.current === "DAI"){
      var value = (parseFloat(_exchange.target.value)*parseFloat(1.75)).toFixed(2)
      setDai(_exchange.target.value)
      setCura(value)
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
    exchangeMarket.current =_market;

    console.log(_market);

    setStyle(reset, false);
    setStyle(_market, true);
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

  const buttonOperation = async() => {
    switch(exchangePhase){
      case "Approve":
        return await approveTokens()
      case "Swap":
        return await swapTokens()
      case "Connect":
        return await initialiseWeb3()
    }
  }

  useEffect(() => {
    exchangeMarket.current = "DAI"
    setStyle("DAI", true)
  }, [])

  useEffect(() => {

  })

  return (
      <Modal
        operation={buttonOperation}
        marketChange={marketChange}
        stateChange={onChange}
        market={exchangeMarket}
        phase={exchangePhase}
        cura={exchangeBalance.cura}
        dai={exchangeBalance.dai}
        curaRef={curaRef}
        daiRef={daiRef}
      />
   )
}

export default Exchange;
