import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Dropzone from "react-dropzone";

import { Filesize } from "support/utils";

const styles = theme => ({
  gridWrap: {
    padding: theme.spacing.unit
  },
  rejectedWrap: {
    textDecoration: "line-through"
  }
});

class DropZone extends Component {
  state = {
    files: [],
    rejectedFiles: []
  };
  //===========================================================================

  handleDrop = (files, rejectedFiles) => {
    this.setState({
      files,
      rejectedFiles
    });
  };
  handleCancel = () => {
    this.setState({
      files: [],
      rejectedFiles: []
    });
  };
  //===========================================================================

  handleGetFiles = () => {
    return this.state.files;
  };
  //===========================================================================

  render() {
    const { handleDrop, handleCancel } = this;
    const { classes } = this.props;
    const { gridWrap, rejectedWrap } = classes;
    return (
      <Grid container>
        <Grid item container xs={4} className={gridWrap}>
          <Dropzone
            name="files"
            maxSize={1024000}
            onDrop={handleDrop}
            onFileDialogCancel={handleCancel}
          />
        </Grid>
        <Grid item container xs={8} className={gridWrap}>
          <Grid item container>
            <h2>업로드 파일목록</h2>
          </Grid>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {Filesize(f.size)}
              </li>
            ))}
            {this.state.rejectedFiles.map(f => (
              <li key={f.name} className={rejectedWrap}>
                {f.name} - {Filesize(f.size)}
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DropZone);
