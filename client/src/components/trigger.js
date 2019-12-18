import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import style from '../assets/css/trigger';

const CustomButton = styled(Button)(style);

class Trigger extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CustomButton onClick={this.props.onClick} variant="outlined">{this.props.label}</CustomButton>
    );
  }
}

export default Trigger;
