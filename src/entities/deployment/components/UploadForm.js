import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";

import { Result } from "common/constant";
import { ValidationForm } from "support/validator";
import { DropZone } from "support/wrapper";

const styles = theme => ({
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class UploadForm extends Component {
  state = {
    open: false
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

  handleSubmit = async () => {
    const { form, Actions, handleSendMsg, handleReloadTree } = this.props;
    if (this._dropZone.handleGetFiles().length > 0)
      try {
        await Actions.uploadDeployment(form, this._dropZone.handleGetFiles());
        if (this.props.result.key === Result.SUCCESS) {
          handleReloadTree();
          this.handleClose();
        } else {
          handleSendMsg(this.props.result);
        }
      } catch (e) {
        handleSendMsg(this.props.result);
      }
    else handleSendMsg({ desc: "업로드할 파일은 선택해 주세요." });
  };
  //===========================================================================

  render() {
    const { handleClose, handleSubmit } = this;
    const { classes, form } = this.props;
    const { buttonWrap, button } = classes;
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">파일 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사각형 박스에 파일들을 드래그&드롭 하거나 클릭해서
            선택하세요.(용량제한 : 1mb)
            <br />
            업로드 위치 ({form.parentPath})
          </DialogContentText>
          <ValidationForm onSubmit={handleSubmit}>
            <DropZone innerRef={node => (this._dropZone = node)} />
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
