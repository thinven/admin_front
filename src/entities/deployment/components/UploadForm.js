import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";

import Dropzone from "react-dropzone";
import filesize from "filesize";

import { ValidationForm } from "support/validator";

const styles = theme => ({
  gridWrap: {
    padding: theme.spacing.unit
  },
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class UploadForm extends Component {
  state = {
    open: false,
    files: []
  };
  //===========================================================================

  /**
   * 업로드폼 열기/닫기 메소드.
   */
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  //===========================================================================

  handleDrop = files => {
    this.setState({
      files
    });
  };

  handleCancel = () => {
    this.setState({
      files: []
    });
  };
  //===========================================================================

  handleSubmit = () => {};
  //===========================================================================

  render() {
    const { handleClose, handleDrop, handleCancel, handleSubmit } = this;
    const { classes } = this.props;
    const { gridWrap, buttonWrap, button } = classes;
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">파일 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사각형 박스에 파일들을 드래그&드롭 하거나 클릭해서 선택하세요.
          </DialogContentText>
          <ValidationForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid item container xs={4} className={gridWrap}>
                <Dropzone
                  onDrop={handleDrop}
                  onFileDialogCancel={handleCancel}
                />
              </Grid>
              <Grid item container xs={8} className={gridWrap}>
                <h2>업로드 파일목록</h2>
                <ul>
                  {this.state.files.map(f => (
                    <li key={f.name}>
                      {f.name} - {filesize(f.size)}
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
            <Grid container className={buttonWrap}>
              <Grid item container xs={12} justify="center">
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  className={button}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className={button}
                >
                  업로드
                </Button>
              </Grid>
            </Grid>
          </ValidationForm>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UploadForm);
