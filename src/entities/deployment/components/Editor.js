import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./editor.css";

const styles = theme => ({
  codeMirror: {
    width: "100%"
  }
});

class Editor extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.editor !== nextProps.editor) return true;
    return false;
  }
  //===========================================================================
  handleChangeInput = (editor, data, value) => {
    const { Actions } = this.props;
    Actions.changeInput({ name: "text", value });
  };
  //===========================================================================

  render() {
    const { handleChangeInput } = this;
    const { classes, form } = this.props;
    const { codeMirror } = classes;
    console.log("Editor!!!", form);
    return (
      <CodeMirror
        value={form.text}
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true
        }}
        onChange={handleChangeInput}
        className={codeMirror}
      />
    );
  }
}

export default withStyles(styles)(Editor);
