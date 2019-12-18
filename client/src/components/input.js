import React, { Component } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import style from '../assets/css/input';

const TextInput = styled(TextField)(style);

class Input extends Component {
  constructor(props) {
    super(props)
  }

  NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      />
    );
  }

  render() {
    return (
      <TextInput label={this.props.label} variant="outlined"
        InputProps={{
          endAdornment: this.props.currency + '\xa0',
          inputComponent: this.NumberFormatCustom
        }} />
    );
  }
}

export default Input;
