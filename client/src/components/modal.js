import React, { Component } from 'react';

import { styled } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import style from '../assets/css/modal';
import curaDAI from '../assets/img/cura.png';
import normDAI from '../assets/img/dai.png';
import Trigger from './trigger';
import Wallet from './wallet';
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
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              <Wallet cura={this.props.cura} dai={this.props.dai}/>
            </Grid>
            <Grid item>
              <HelpIcon className="help" />
            </Grid>
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
            <Input exchange="1.78" currency='CuraDAI' label='Amount'/>
            </Grid>
          </Grid>
          <Grid item>
            <Trigger onClick={this.props.operation} label={this.props.phase}/>
          </Grid>
        </Grid>
      </ModalBase>
    );
  }
}

export default Modal;
