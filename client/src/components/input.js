import React, { useEffect, useRef } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import style from '../assets/css/input';

const TextInput = styled(TextField)(style);

function Input(props){

  const NumberFormatCustom = (props) => {
    let { inputRef, onChange, ...other } = props;

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
     )
  }

  const detectMarket = () => {
    if(props.market !== props.currency){
      props.marketChange(props.currency)
    }
  }

  return (
   <TextInput onChange={props.stateChange}
       onClick={detectMarket} value={props.targetRef}
       label={props.label} variant="outlined"
       InputLabelProps={{ shrink: true }}
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
