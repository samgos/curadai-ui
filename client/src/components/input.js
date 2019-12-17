import React, { Component } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import style from '../assets/css/input';

const TextInput = styled(TextField)(style);

class Input extends Component {
  constructor(props) {
    super(props)
      this.state = {}
  }

  render() {
    return (
      <TextInput label={this.props.label} variant="outlined"
        InputProps={{
          endAdornment: this.props.currency + '\xa0'
        }} />
    );
  }
}

export default Input;
