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
            <li> <i class="lab la-twitter" /> <a> @Curadao </a> </li>
            <li> <i class="lab la-facebook-f" /> <a> @Curadao </a> </li>
            <li> <i class="lab la-linkedin-in" /> <a> @CWdao </a> </li>
          </ul>
        </Grid>
        <Grid item>
          <ul className="footer-list-alt">
            <li> <a> CuraDAI contract </a> </li>
            <li> <a> Gitcoin grants </a> </li>
            <li> <a> CuraDAO </a> </li>
          </ul>
        </Grid>
        <Grid item>
          <h3> Got a question? </h3>
          <p> Just email us at <br /> <a> curadai@curadao.io </a> </p>
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
