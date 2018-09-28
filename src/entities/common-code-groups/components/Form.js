import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

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

class Form extends Component {
  state = {
    open: false
  };
  //===========================================================================
  handleOpen = () => {
    const { FormActions } = this.props;
    FormActions.initialize();
    this.setState({
      open: true
    });
  };
  handleChangeInput = e => {
    const { FormActions } = this.props;
    const { name, value } = e.target;
    FormActions.changeInput({ name, value });
  };
  handleSubmit = async () => {
    const {
      form,
      FormActions,
      CommonCodeListActions,
      handleSendMsg
    } = this.props;
    try {
      await FormActions.patchCommonCodeGroup(form);
      if (this.props.result.key === "SUCCESS") {
        CommonCodeListActions.patchCommonCodeGroup(form);
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
  handleOpenEdit = original => {
    const { FormActions } = this.props;
    FormActions.loadCommonCodeGroup({
      info: original.commonCodeGroup
    });
    this.setState({
      open: true
    });
  };
  //===========================================================================
  render() {
    const { handleChangeInput, handleSubmit, handleClose } = this;
    const { classes, form, useCodes } = this.props;
    const { buttonWrap, button } = classes;

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">공통코드그룹 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사용여부 수정시 바로 적용됩니다.
          </DialogContentText>
          <ValidationForm onSubmit={handleSubmit}>
            <Input type="hidden" name="uid" value={form.uid} />
            <Grid container>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    maxLength={20}
                    name="name"
                    label="그룹명"
                    value={form.name}
                    onChangeInput={handleChangeInput}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input
                    required
                    name="use"
                    label="사용여부"
                    value={form.use}
                    onChangeInput={handleChangeInput}
                    select
                  >
                    {useCodes.map(option => (
                      <MenuItem key={option.value} value={option.value * 1}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Input>
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

export default withStyles(styles)(Form);
