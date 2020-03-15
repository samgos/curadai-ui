import React from 'react'

import Grid from '@material-ui/core/Grid'
import Exchange from './exchange'

import palm from './assets/img/palm.png'
import cura from './assets/img/cura.png'
import dai from './assets/img/dai.png'

import stock from './assets/css/stock'
import './assets/css/stock.css'

function Cura(){
  return(
    <main>
      <Grid container direction="column" justify="center" alignItems="center" style={stock}>
        <Grid item container direction="row" justify="center" alignItems="flex-start">
          <Grid item>
            <img className="landing-logo" src={cura} />
          </Grid>
          <Grid item>
            <div className="landing-title">
              <span className="title-1">Cura</span>
              <span className="title-2">DAI</span>
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <h3 className="landing-excerpt">A seamless digital currency for the island of <a>Curaçao</a>.</h3>
        </Grid>
        <Grid item>
          <div className="landing-graphic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stop-color="#122f7b"/>
                  <stop offset="100%" stop-color="#0099ff"/>
                </linearGradient>
              </defs>
              <path fill="#0099ff" fill-opacity="1" d="M0,192L60,208C120,224,240,256,360,261.3C480,267,600,245,720,218.7C840,192,960,160,1080,165.3C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="flex-start" alignItems="center" style={stock}>
        <Grid item container direction="row" justify="space-evenly" alignItems="center" spacing={3}>
          <Grid item>
            <div className="currency-card">
              <img className="currency-logo" src={dai} />
              <p> DAI pegged </p>
              <p> 1,000,000 <a>DAI</a> </p>
            </div>
          </Grid>
          <Grid item>
          <div className="currency-card">
            <img className="currency-logo" src={cura} />
            <p> CURA created </p>
            <p> 1,780,000 <a>CURA</a> </p>
          </div>
          </Grid>
          <Grid item>
          <div className="currency-card">
            <i className="las la-users" />
            <p> Active users </p>
            <p> 1,000 <a>Users</a></p>
          </div>
          </Grid>
        </Grid>
        <Grid item>
          <Exchange />
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="baseline" style={stock}>
        <Grid item container direction="row" justify="space-evenly" alignItems="center" spacing={3}>
          <Grid item>
            <div className="trait-card">
              <i className="las la-balance-scale" />
              <p>Transperant</p>
              <p>With thanks to the underlying technology, individuals can monitor the monetary supply and it's economics.</p>
            </div>
          </Grid>
          <Grid item>
            <div className="trait-card">
              <i className="las la-shipping-fast" />
              <p>Instant</p>
              <p>Enjoy not waiting 3-4 days for bank transfers to process, enjoy the finality of digital currencies instead.</p>
            </div>
          </Grid>
          <Grid>
            <div className="trait-card">
              <i className="las la-store-alt" />
              <p>Accessible</p>
              <p>Choose from over 50's merchants on the island alone to spend your money or take it to the world wild web.</p>
            </div>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="space-around" alignItems="center">
          <Grid item>
            <div className="palm-vector">
              <img src={palm} />
            </div>
          </Grid>
          <Grid item>
            <div className="benefits">
              <h3> Sit back and enjoy the island life! </h3>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </main>
  )
}

export default Cura;
