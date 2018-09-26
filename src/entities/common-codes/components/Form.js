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
import { Input, AutoComplete } from "support/wrapper";

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
  handleLoadOptions = async (inputValue, callback) => {
    const { GroupListActions } = this.props;
    try {
      await GroupListActions.getCommonCodeGroups({ name: inputValue });
      callback(
        this.props.groupList.map(group => ({
          value: group.uid,
          label: group.name
        }))
      );
    } catch (e) {
      console.log("handleLoadOptions catch", e);
    }
  };
  handleAutoCompleteChange = (name, val) => {
    const { FormActions } = this.props;
    FormActions.changeInput({ name: name + "n", value: val.label });
    FormActions.changeInput({ name: name + "u", value: val.value });
  };
  handleChangeInput = e => {
    const { FormActions } = this.props;
    const { name, value } = e.target;
    FormActions.changeInput({ name, value });
  };
  handleSubmit = async () => {
    const { form, FormActions, ListActions, onSendMsg } = this.props;
    try {
      if (form.uid) {
        await FormActions.patchCommonCode(form);
      } else {
        await FormActions.addCommonCode(form);
      }
      if (this.props.result.key === "SUCCESS") {
        if (form.uid) {
          ListActions.patchCommonCode(this.props.info);
        } else {
          ListActions.addCommonCode(this.props.info);
        }
        this.handleCloseForm();
      } else {
        onSendMsg(this.props.result);
      }
    } catch (e) {
      console.log("handleSubmit catch", e);
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  //===========================================================================
  handleOpenEdit = original => {
    const { FormActions } = this.props;
    FormActions.loadCommonCode({
      info: original
    });
    this.setState({
      open: true
    });
  };
  //===========================================================================
  render() {
    const {
      handleLoadOptions,
      handleAutoCompleteChange,
      handleChangeInput,
      handleSubmit,
      handleClose
    } = this;
    const { classes, form, useCodes } = this.props;
    const { buttonWrap, button } = classes;

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">공통코드 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            등록된 코드는 와스 재기동후에야 정상적으로 동작합니다.
            <br />
            코드는 숫자로만 기입해 주세요.
          </DialogContentText>
          <ValidationForm onSubmit={handleSubmit}>
            <Input type="hidden" name="uid" value={form.uid} />
            <Grid container>
              <Grid item container xs={12}>
                <AutoComplete
                  label={"공통코드그룹"}
                  placeholder={"입력문자열로 자동검색합니다."}
                  name={"bcg"}
                  value={{ label: form.bcgn, value: form.bcgu }}
                  loadOptions={handleLoadOptions}
                  onChanges={handleAutoCompleteChange}
                  maxMenuHeight={150}
                />
              </Grid>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    isNumber
                    maxLength={20}
                    name="code"
                    label="코드"
                    value={form.code}
                    onChangeInput={handleChangeInput}
                    autoFocus={true}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input
                    required
                    maxLength={20}
                    name="name"
                    label="코드명"
                    value={form.name}
                    onChangeInput={handleChangeInput}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    isNumber
                    name="ordered"
                    label="순서"
                    value={form.ordered}
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
