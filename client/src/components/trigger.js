import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import style from '../assets/css/trigger';

const CustomButton = styled(Button)(style);

export default function Trigger(props){
  return (
    <CustomButton onClick={props.onClick} variant="outlined">{props.label}</CustomButton>
  )
}
