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
import { Input } from "support/wrapper";

const styles = theme => ({
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class LoginForm extends Component {
  state = {
    open: false
  };
  //===========================================================================

  handleOpen = () => {
    const { Actions } = this.props;
    Actions.initForm();
    this.setState({
      open: true
    });
  };
  handleChangeInput = e => {
    const { Actions } = this.props;
    const { name, value } = e.target;
    Actions.changeInput({ name, value });
  };
  handleSubmit = async () => {
    const { form, Actions, handleSendMsg } = this.props;
    try {
      await Actions.getEmployeeAuth(form);
      if (this.props.result.key === Result.SUCCESS) {
        this.handleClose();
      } else {
        handleSendMsg(this.props.result);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  //===========================================================================

  render() {
    const { handleChangeInput, handleSubmit, handleClose } = this;
    const { classes, form } = this.props;
    const { buttonWrap, button } = classes;

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">로그인</DialogTitle>
        <DialogContent>
          <DialogContentText>안녕하세요.</DialogContentText>
          <ValidationForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    minLength={6}
                    maxLength={20}
                    name="id"
                    label="로그인ID"
                    value={form.id}
                    onChangeInput={handleChangeInput}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input
                    required
                    minLength={6}
                    maxLength={20}
                    name="pw"
                    label="비밀번호"
                    type="password"
                    value={form.pw}
                    onChangeInput={handleChangeInput}
                  />
                </Grid>
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
                  접속하기
                </Button>
              </Grid>
            </Grid>
          </ValidationForm>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(LoginForm);
