import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props){
    return (
      <Dialog
         open={props.trigger}
         TransitionComponent={Transition}
         keepMounted
         onClose={props.openModal}
       >
         <DialogTitle>{props.bodyTitle}</DialogTitle>
         <DialogContent>
           <DialogContentText>
              {props.bodyText}
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           {props.buttonState && (
             <Button onClick={props.closeModal}
              style={{
              backgroundColor: "grey",
              color: "white"
            }}>
            Dismiss
            </Button>
          )}
         </DialogActions>
       </Dialog>
  )
}

export default Alert;
