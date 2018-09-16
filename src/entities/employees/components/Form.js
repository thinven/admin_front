import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";

import { withStyles } from "@material-ui/core/styles";

import { Input } from "support/wrapper";
import { HpMaskedInput } from "support/wrapper/maskedinput";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit
  },
  textFieldFirst: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 300 - theme.spacing.unit * 5
  },
  textField: {
    marginBottom: theme.spacing.unit,
    width: 300 - theme.spacing.unit * 4
  },
  textFieldFull: {
    marginBottom: theme.spacing.unit,
    width: 600 - theme.spacing.unit * 8
  },
  dialogActions: {
    paddingRight: 4 * theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

const genders = [
  {
    value: 10,
    label: "남"
  },
  {
    value: 20,
    label: "여"
  }
];

class Form extends Component {
  state = {
    gender: "10"
  };
  //===========================================================================
  render() {
    const {
      classes,
      form,
      formOpen,
      onCloseForm,
      onSubmit,
      onChangeInput
    } = this.props;
    const { textFieldFirst, textField, dialogActions } = classes;
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
          </DialogContentText>
          <form autoComplete="off">
            <Input
              required
              minLength={6}
              maxLength={20}
              name="id"
              label="로그인ID"
              value={form.id}
              onChangeInput={onChangeInput}
              className={textFieldFirst}
              autoFocus={true}
            />
            <Input
              disabled
              name="pw"
              label="비밀번호"
              type="password"
              className={textField}
            />
            <Input
              required
              maxLength={20}
              name="firstname"
              label="이름"
              value={form.firstname}
              onChangeInput={onChangeInput}
              className={textFieldFirst}
            />
            <Input
              required
              maxLength={20}
              name="lastname"
              label="성"
              value={form.lastname}
              onChangeInput={onChangeInput}
              className={textField}
            />
            <Input
              required
              isDate
              name="birthday"
              label="생일"
              type="date"
              value={form.birthday}
              onChangeInput={onChangeInput}
              className={textFieldFirst}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Input
              required
              name="gender"
              label="성별"
              value={form.gender}
              onChangeInput={onChangeInput}
              className={textField}
              select
            >
              {genders.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Input>
            <Input
              required
              isHp
              name="phone"
              label="연락처(HP)"
              value={form.phone}
              onChangeInput={onChangeInput}
              className={textFieldFirst}
              InputProps={{
                inputComponent: HpMaskedInput
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Input
              required
              isEmail
              name="email"
              label="이메일"
              type="email"
              value={form.email}
              onChangeInput={onChangeInput}
              className={textField}
            />
          </form>
          <DialogActions className={dialogActions}>
            <Button onClick={onCloseForm} variant="outlined">
              취소
            </Button>
            <Button onClick={onSubmit} variant="outlined" color="primary">
              저장
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Form);
