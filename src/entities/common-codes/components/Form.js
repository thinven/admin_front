import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import { Result } from "common/constant";

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

  /**
   * 등록폼 열기/닫기 메소드.
   */
  handleOpen = () => {
    const { Actions } = this.props;
    Actions.initForm();
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  //===========================================================================

  /**
   * 수정폼 열기 메소드.
   */
  handleOpenEdit = original => {
    const { Actions } = this.props;
    Actions.loadForm({
      info: original
    });
    this.setState({
      open: true
    });
  };
  //===========================================================================

  /**
   * 사용자 입력 관련 메소드.
   */
  handleLoadOptions = async (inputValue, callback) => {
    const { GroupActions } = this.props;
    try {
      await GroupActions.getCommonCodeGroups({ name: inputValue });
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
    const { Actions } = this.props;
    Actions.changeInput({
      name: name + "n",
      value: val.label ? val.label : ""
    });
    Actions.changeInput({
      name: name + "u",
      value: val.value ? val.value : ""
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
      if (form.uid) {
        await Actions.patchCommonCode(form);
      } else {
        await Actions.addCommonCode(form);
      }
      if (this.props.result.key === Result.SUCCESS) {
        this.handleClose();
      } else {
        handleSendMsg(this.props.result);
      }
    } catch (e) {
      console.log("handleSubmit catch", e);
    }
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
                  autoFocus={true}
                />
              </Grid>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    isNumber
                    maxNumber={999999999}
                    name="code"
                    label="코드"
                    value={form.code}
                    onChangeInput={handleChangeInput}
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
