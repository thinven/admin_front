import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";

import { Result } from "common/constant";
import { ValidationForm } from "support/validator";
import { Input } from "support/wrapper";

const styles = theme => ({
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class NewFolderForm extends Component {
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

  handleChangeInput = e => {
    const { Actions } = this.props;
    const { name, value } = e.target;
    Actions.changeInput({ name, value });
  };
  handleSubmit = async () => {
    const { form, Actions, handleSendMsg } = this.props;
    try {
      await Actions.newFolderDeployment(form);
      if (this.props.result.key === Result.SUCCESS) {
        this.handleClose();
      } else {
        handleSendMsg(this.props.result);
      }
    } catch (e) {
      handleSendMsg(this.props.result);
    }
  };
  //===========================================================================

  render() {
    const { handleClose, handleChangeInput, handleSubmit } = this;
    const { classes, form } = this.props;
    const { buttonWrap, button } = classes;
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">폴더 생성</DialogTitle>
        <DialogContent>
          <DialogContentText>
            생성할 폴더명을 입력한 후 저장하세요.
          </DialogContentText>
          <ValidationForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid item container>
                <Input
                  required
                  maxLength={20}
                  name="folderName"
                  label="폴더명"
                  value={form.folderName}
                  onChangeInput={handleChangeInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment variant="filled" position="start">
                        {form.parentPath}
                      </InputAdornment>
                    )
                  }}
                />
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
                  저장
                </Button>
              </Grid>
            </Grid>
          </ValidationForm>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NewFolderForm);
