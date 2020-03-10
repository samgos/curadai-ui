import React from 'react'

import Grid from '@material-ui/core/Grid'
import stock from './assets/css/stock'
import cura from './assets/img/cura.png'
import './assets/css/stock.css'
import Exchange from './exchange'

function Cura(){
  return(
    <Grid container direction="column" justify="center" alignItems="center" style={stock}>
      <Grid item container direction="row" justify="center" alignItems="flex-start">
        <Grid item>
          <img className="landing-logo" src={cura} />
        </Grid>
        <Grid item>
          <h1 className="landing-title"> CuraDAI</h1>
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
  )
}

export default Cura;
