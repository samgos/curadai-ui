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
    this.state = {}
  }

  detectState = async(event) => {
    const { stateChange, market, currency } = this.props;

    if(market === currency){
      await this.setState({ value: event.target.value });
      await this.props.stateChange(
        parseFloat(event.target.value)
      );
    }
  }

 componentWillReceiveProps = (props) => {
    const { rate, market, currency } = props;

    if(market !== currency && !isNaN(rate)){
      this.setState({
        value: rate
      });
    }
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

  detectMarket = async() => {
    const { rate, market, currency } = this.props;

    if(market !== currency){
      await this.props.marketChange(currency);
    }
  }

  render() {
    return (
      <TextInput onSelect={this.detectMarket}
        onChange={this.detectState} value={this.state.value}
        label={this.props.label} variant="outlined"
         helperText={
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
