import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";

import { ValidationForm } from "support/validator";
import { Input } from "support/wrapper";
import { HpMaskedInput } from "support/wrapper/maskedinput";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit
  },
  textFieldFull: {
    marginBottom: theme.spacing.unit,
    width: 600 - theme.spacing.unit * 8
  },
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Form extends Component {
  state = {
    gender: "10"
  };
  //===========================================================================
  render() {
    const {
      classes,
      form,
      genderCodes,
      formOpen,
      onCloseForm,
      onSubmit,
      onChangeInput
    } = this.props;
    const { buttonWrap, button } = classes;
    return (
      <Dialog
        onClose={onCloseForm}
        aria-labelledby="simple-dialog-title"
        open={formOpen}
      >
        <DialogTitle id="simple-dialog-title">사원 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사원 등록후 바로 사이트에 접속 가능합니다.
            <br />첫 비밀번호는 아이디와 동일하게 세팅 됩니다.
          </DialogContentText>
          <ValidationForm onSubmit={onSubmit}>
            <Input type="hidden" name="uid" value={form.uid} />
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
                    onChangeInput={onChangeInput}
                    autoFocus={true}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input disabled name="pw" label="비밀번호" type="password" />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    maxLength={20}
                    name="firstname"
                    label="이름"
                    value={form.firstname}
                    onChangeInput={onChangeInput}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input
                    required
                    maxLength={20}
                    name="lastname"
                    label="성"
                    value={form.lastname}
                    onChangeInput={onChangeInput}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    isDate
                    name="birthday"
                    label="생일"
                    type="date"
                    value={form.birthday}
                    onChangeInput={onChangeInput}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input
                    required
                    name="gender"
                    label="성별"
                    value={form.gender}
                    onChangeInput={onChangeInput}
                    select
                  >
                    {genderCodes.map(option => (
                      <MenuItem key={option.value} value={option.value * 1}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Input>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item container xs={6}>
                  <Input
                    required
                    isHp
                    name="phone"
                    label="연락처(HP)"
                    value={form.phone}
                    onChangeInput={onChangeInput}
                    InputProps={{
                      inputComponent: HpMaskedInput
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input
                    required
                    isEmail
                    name="email"
                    label="이메일"
                    type="email"
                    value={form.email}
                    onChangeInput={onChangeInput}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={buttonWrap}>
              <Grid item container xs={12} justify="center">
                <Button
                  onClick={onCloseForm}
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
