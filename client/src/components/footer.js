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
      <Grid container direction="row" alignItems="center" justify="space-around">
        <Grid item>
          <ul>
            <li> Facebook </li>
            <li> Linkedin </li>
            <li> Twitter </li>
          </ul>
        </Grid>
        <Grid item>
          <h5> Got a question? </h5>
          <p> Just email us at curadai@curadao.io </p>
        </Grid>
        <Grid item>
          <h5> © Curadao 2020. All rights reserved. </h5>
        </Grid>
      </Grid>
    </Base>
  )
}

export default Footer;
