import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import style from '../assets/css/modal';
import curaDAI from '../assets/img/cura.png';
import normDAI from '../assets/img/dai.png';
import Trigger from './trigger';
import Input from './input';

const ModalBase = styled(Paper)(style);

class Modal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ModalBase>
        <Grid container direction='column' alignItems='center' spacing={6}>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              1 DAI = 1.78 CuraDAI
            </Typography>
          </Grid>
          <Grid item container direction='row' justify='center' spacing={3}>
            <Grid item>
              <img className='logo' src={normDAI} />
            </Grid>
            <Grid item>
              <Input currency='DAI' label='Amount'/>
            </Grid>
          </Grid>
          <Grid item container direction='row' justify='center' spacing={3}>
            <Grid item>
              <img className='logo' src={curaDAI} />
            </Grid>
            <Grid item>
            <Input currency='CuraDAI' label='Amount'/>
            </Grid>
          </Grid>
          <Grid item alignItems='right'>
            <Trigger label='Swap'/>
          </Grid>
        </Grid>
      </ModalBase>
    );
  }
}

export default Modal;
