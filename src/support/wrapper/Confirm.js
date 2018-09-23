import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class Confirm extends Component {
  state = {
    open: false,
    title: "알림",
    desc: ""
  };
  handleOpen = ({ title, desc, onOk }) => {
    this.setState({ open: true, title: title, desc: desc });
    this.onOk = onOk;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOk = () => {
    if (this.onOk) this.onOk();
    this.handleClose();
  };
  render() {
    const { title, desc } = this.state;
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            아니요
          </Button>
          <Button onClick={this.handleOk} color="primary" autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Confirm;
