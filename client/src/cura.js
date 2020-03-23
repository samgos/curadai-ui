import React, { useRef, useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'

import { styled } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Footer from './components/footer'
import Exchange from './exchange'

import metamask from './assets/img/metamask.png'
import daostack from './assets/img/daostack.png'
import trust from './assets/img/trust.png'
import cura from './assets/img/cura.png'
import dai from './assets/img/dai.png'

import primary from './assets/css/primary'
import trigger from './assets/css/trigger'
import banner from './assets/css/banner'
import input from './assets/css/input'
import alt from './assets/css/alt'

import stock from './assets/css/stock'
import './assets/css/stock.css'

const ModalBase = styled(Paper)(banner);
const TextInput = styled(TextField)(input);
const Trigger = styled(Button)(trigger);
const ButtonAlt = styled(Button)(alt);
const ButtonPrimary = styled(Button)(primary);

function Cura(){
  const [ tokenMetadata, setMetadata ] = useState({ CURA: 0, DAI: 0 })

  const email = useRef(null)

  const contactSubmit = async() => {
    await fetch('https://curadai.curadao.io:9000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        email: email.current.value
      })
    }).then(() => {
      document.getElementsByClassName('form-input')[0].value = ""
    })
  }

  useEffect(() => {
   const getStats = async() => {
     const metadata = await fetch('https://curadai.curadao.io:9000/stats', {
      method: 'GET',
      headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     mode: 'cors',
   }).then(res => res.json())
     console.log(metadata)
     setMetadata({ ...metadata })
    }
   getStats()
  }, [])

  return(
    <Grid>
      <Grid container direction="column" justify="flex-end" alignItems="baseline" style={stock}>
        <nav>
          <ul>
            <li><a href="#exchange"> Get CURA </a> </li>
            <li><a href="https://curadao.io" target="_blank">CuraDAO</a> </li>
            <li><a href="#contact"> Contact </a> </li>
          </ul>
        </nav>
        <Grid item container direction="row" justify="center" alignItems="flex-start">
          <Grid item>
            <img className="landing-logo" src={cura} />
          </Grid>
          <Grid item>
            <div className="landing-content">
              <span className="landing-title"> CuraDAI </span>
              <p className="landing-excerpt">A seamless digital currency for the island of <a>Curaçao</a></p>
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <div className="landing-graphic">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stop-color="#0d2259"/>
                <stop offset="100%" stop-color="#005e9d"/>
              </linearGradient>
              </defs>
              <path fill="#0099ff" fill-opacity="1" d="M0,160L80,144C160,128,320,96,480,112C640,128,800,192,960,208C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <defs>
                <linearGradient id="gradientAlt" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stop-color="#122f7b"/>
                  <stop offset="100%" stop-color="#0099ff"/>
                </linearGradient>
              </defs>
              <path fill="#0099ff" fill-opacity="1" d="M0,192L60,208C120,224,240,256,360,261.3C480,267,600,245,720,218.7C840,192,960,160,1080,165.3C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="flex-start" alignItems="center" id="exchange" >
        <Grid item container direction="row" justify="space-evenly" alignItems="center">
          <Grid item>
            <div className="currency-card">
              <img className="currency-logo" src={dai} />
              <p> DAI pegged </p>
              <p> {tokenMetadata.DAI} <a>DAI</a> </p>
            </div>
          </Grid>
          <Grid item>
          <div className="currency-card">
            <img className="currency-logo" src={cura} />
            <p> CURA created </p>
            <p> {tokenMetadata.CURA} <a>CURA</a> </p>
          </div>
          </Grid>
          <Grid item>
          <div className="currency-card">
            <i className="las la-users" />
            <p> Active users </p>
            <p> 20 <a>Users</a></p>
          </div>
          </Grid>
        </Grid>
        <Grid item>
          <Exchange />
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="baseline">
        <Grid item container direction="row" justify="space-evenly" alignItems="center">
          <Grid item>
            <div className="trait-card">
              <i className="las la-balance-scale" />
              <p>Transperant</p>
              <p>With thanks to the underlying technology, individuals can monitor the monetary supply and it's economics</p>
            </div>
          </Grid>
          <Grid item>
            <div className="trait-card">
              <i className="las la-shipping-fast" />
              <p>Instant</p>
              <p>Enjoy not waiting 3-4 days for bank transfers to process, enjoy the finality of digital currencies instead</p>
            </div>
          </Grid>
          <Grid>
            <div className="trait-card">
              <i className="las la-store-alt" />
              <p>Accessible</p>
              <p>Choose from over 50's merchants on the island alone to spend your money or take it to the world wild web</p>
            </div>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="space-around" alignItems="center">
          <Grid item>
            <div className="palm-vector">
              <ReactSVG src="palm.svg" />
            </div>
          </Grid>
          <Grid item>
            <div className="benefits">
              <h3> Sit back and enjoy the island life! </h3>
              <ButtonPrimary variant="outlined" href="https://drive.google.com/open?id=1fG16u3z9YGX8KiTmFrdXyyhqEh47jki_" target="_blank" className="learn-button"> Learn more </ButtonPrimary>
              <ButtonAlt variant="outlined" className="earn-button" href="https://curadao.io/proposal/" target="_blank"> Earn CuraDAI </ButtonAlt>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="stretch" style={{ margin: "2.5em 0em"}} id="contact">
        <Grid item>
          <ModalBase>
            <div className="banner-content">
              <Grid item container direction="row" justify="space-between" alignItems="flex-start">
                <Grid item>
                  <h1 className="banner-title"> Want to become a CuraDAI merchant? </h1>
                  <p> Leave your email to find more about accepting CuraDAI in your business</p>
                </Grid>
                <Grid item>
                  <div className="form-content">
                    <TextInput ref={email} className="form-input" variant="outlined" label="Email" />
                    <Trigger className="form-button" onClick={contactSubmit}> Submit </Trigger>
                  </div>
                </Grid>
              </Grid>
            </div>
          </ModalBase>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="baseline" alignItems="center" style={{ marginTop: "3.25em"}}>
        <Grid item>
          <h1 className="page-title"> Wallets </h1>
        </Grid>
        <Grid item container direction="row" justify="space-around" alignItems="space-evenly">
          <Grid item>
            <a className="integration-card" href="https://metamask.io" target="_blank">
              <img className="integration-logo" src={metamask} />
              <p> Metamask </p>
            </a>
          </Grid>
          <Grid item>
            <a className="integration-card" href="https://trustwallet.com" target="_blank">
              <img className="integration-logo" src={trust} />
              <p> Trust </p>
            </a>
          </Grid>
          <Grid item>
            <a className="integration-card" href="https://daostack.io" target="_blank">
              <img className="integration-logo-alt" src={daostack} />
              <p> DAOstack </p>
            </a>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  )
}

export default Cura;
