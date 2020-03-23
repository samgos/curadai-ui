import React from 'react'

import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

import gradient from '../assets/img/california.jpg'

const Base = styled.footer`
  background: url(${gradient});
  background-position: 75% 50%;
  width: 100%;
  margin-top: 10em;
  padding: 2.5em .25em;
  font-size: 1.25em;
`

function Footer() {
  return(
    <Base>
      <Grid container direction="row" alignItems="baseline" justify="space-around">
        <Grid item>
          <ul className="footer-list">
            <li> <a href="https://twitter.com/Cura_DAO" target="_blank"><i class="lab la-twitter" /> @Cura_DAO</a> </li>
            <li> <a href="https://www.linkedin.com/company/curadao/" target="_blank"><i class="lab la-linkedin-in" /> @Curadao</a> </li>
            <li> <a href="https://www.facebook.com/CWdao/" target="_blank"><i class="lab la-facebook-f" /> @CWdao</a> </li>
          </ul>
        </Grid>
        <Grid item>
          <ul className="footer-list-alt">
            <li> <a href="https://etherscan.io/token/0x0a4b2d4b48a63088e0897a3f147ba37f81a27722" target="_blank"> CuraDAI contract </a> </li>
            <li> <a href="https://gitcoin.co/grants/229/curadai-a-defi-based-stable-coin-for-curacao" target="_blank"> Gitcoin grants </a> </li>
            <li> <a href="https://curadao.io" target="_blank"> CuraDAO </a> </li>
          </ul>
        </Grid>
        <Grid item>
          <h3> Got a question? </h3>
          <p> Just email us at <br /> <a className="mail-link" href="mailto:curadai@curadao.io" target="_blank"> curadai@curadao.io </a> </p>
        </Grid>
        <Grid item>
          <span className="rights-reserved">
            <h4> © Curadao 2020. All rights reserved. </h4>
          </span>
        </Grid>
      </Grid>
    </Base>
  )
}

export default Footer;
