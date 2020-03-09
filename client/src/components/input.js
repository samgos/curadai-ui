import React, { useRef, useState } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import style from '../assets/css/input';

const TextInput = styled(TextField)(style);

function Input(props){
  const target = useRef(null)

  const detectState = async(event) => {
    const { stateChange, market, currency } = props;

    if(market === currency){
      stateChange(target)
    }
  }

 const componentWillReceiveProps = (props) => {
    const { rate, market, currency } = props;

    if(market !== currency && !isNaN(rate)){
      this.setState({
        value: rate
      });
    }
  }

  const NumberFormatCustom = (props) => {
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

  const detectMarket = async() => {
    if(props.market !== props.currency){
      await props.marketChange(props.currency)
    }
  }

  return (
    <TextInput onSelect={detectMarket} ref={target}
      label={props.label} variant="outlined"
       helperText={
        <span> {props.currency === "DAI" ?
        "1 DAI = 1.75 CuraDAI" : "1.78 CuraDAI = 1 DAI"}
        </span>}
       InputProps={{
        endAdornment: props.currency + '\xa0',
        inputComponent: NumberFormatCustom
      }}
     />
  )
}

export default Input;
