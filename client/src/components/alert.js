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

class Alert extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Dialog
         open={this.props.trigger}
         TransitionComponent={Transition}
         keepMounted
         onClose={this.props.openModal}
       >
         <DialogTitle>{this.props.bodyTitle}</DialogTitle>
         <DialogContent>
           <DialogContentText>
              {this.props.bodyText}
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           {this.props.buttonState && (
             <Button onClick={this.props.closeModal}
              style={{
              backgroundColor: "grey",
              color: "white"
            }}>
            Dismiss
            </Button>
          )}
         </DialogActions>
       </Dialog>
    );
  }
}

export default Alert;
