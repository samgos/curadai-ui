import React, { useEffect, useRef } from 'react';

import { styled } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import style from '../assets/css/modal';
import curaDAI from '../assets/img/cura.png';
import normDAI from '../assets/img/dai.png';
import Trigger from './trigger';
import Wallet from './wallet';
import Input from './input';

const ModalBase = styled(Paper)(style);

export default function Modal(props){
  return (
    <ModalBase>
      <Grid container direction='column' justify="baseline" alignItems='flex-start' spacing={6}>
        <Grid item container direction='row' justify='space-between'>
          <Grid item>
            <Wallet cura={props.cura} dai={props.dai}/>
          </Grid>
        </Grid>
        <Grid item container direction='row' justify='center' spacing={3}>
          <Grid item>
            <div className="DAI">
              <img src={normDAI} className="logo-DAI" />
            </div>
          </Grid>
          <Grid item>
            <Input market={props.market}
              marketChange={props.marketChange}
              stateChange={props.stateChange}
              stateValue={props.daiRef}
              currency='DAI'
              />
          </Grid>
        </Grid>
        <Grid item container direction='row' justify='center' spacing={3}>
          <Grid item>
            <div className="CuraDAI">
              <img src={curaDAI} className="logo-CuraDAI" />
            </div>
          </Grid>
          <Grid item>
            <Input market={props.market} rate={props.rate}
              marketChange={props.marketChange}
              stateChange={props.stateChange}
              stateValue={props.curaRef}
              currency='CuraDAI'
            />
          </Grid>
        </Grid>
        <Grid item>
          <div className="exchange-button">
            <Trigger onClick={props.operation} label={props.phase}/>
          </div>
        </Grid>
      </Grid>
    </ModalBase>
  )

}
