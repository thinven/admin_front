import React, { Component } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Message extends Component {
  render() {
    const { open, desc, onClose, ...other } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{desc}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
        {...other}
      />
    );
  }
}

export default Message;
