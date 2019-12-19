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
      <TextInput onChange={(e) => this.props.stateChange(e, this.props.currency)}
         label={this.props.label} variant="outlined" helperText={
          <span> {this.props.currency === "DAI" ?
          "1 DAI = 1.75 CuraDAI" : "1.78 CuraDAI = 1 DAI"}
        </span>}
        InputProps={{
          endAdornment: this.props.currency + '\xa0',
          inputComponent: this.NumberFormatCustom
        }} />
    );
  }
}

export default Input;
