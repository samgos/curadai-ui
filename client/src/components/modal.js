import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import style from '../assets/css/modal';

const ModalBase = styled(Paper)(style);

class Modal extends Component {
  constructor(props) {
    super(props)
      this.state = {}
  }

  render() {
    return (
      <ModalBase>
        <Typography variant="h5" gutterBottom>
          CuraDAI
        </Typography>
      </ModalBase>
    );
  }
}

export default styled(Modal)(style);
