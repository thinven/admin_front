import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

const styles = theme => ({
  codeMirror: {
    width: "100%"
  }
});

class Editor extends Component {
  render() {
    const { classes } = this.props;
    const { codeMirror } = classes;
    return (
      <CodeMirror
        value="<h1>I ♥ react-codemirror2</h1>"
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true
        }}
        onChange={(editor, data, value) => {}}
        className={codeMirror}
      />
    );
  }
}

export default withStyles(styles)(Editor);
