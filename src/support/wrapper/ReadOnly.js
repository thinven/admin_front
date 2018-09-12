import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  readonly: {
    width: "96%"
  }
});

class ReadOnly extends Component {
  render() {
    const { classes, ...other } = this.props;
    const { readonly } = classes;
    return (
      <TextField
        fullWidth
        InputProps={{
          readOnly: true
        }}
        margin="normal"
        className={readonly}
        {...other}
      />
    );
  }
}

export default withStyles(styles)(ReadOnly);
