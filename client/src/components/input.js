import React, { useContext } from 'react'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import { styled } from '@material-ui/core/styles'
import NumberFormat from 'react-number-format'
import style from '../assets/css/input'
import { store } from '../state'

const TextInput = styled(TextField)(style)

function Input(props){
  let { state, dispatch } = useContext(state)

  const NumberFormatCustom = (props) => {
    let { inputRef, onChange, ...other } = props

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
            value: values.value,
            },
          })
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
   <TextInput onClick={detectMarket} value={props.dispatchValue}
       label="Amount" variant="outlined"
       InputLabelProps={{ shrink: true }}
       onChange={(e) => dispatch({
          type: props.dispatchEvent, payload: e.target.value
        })}
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

export default Input
