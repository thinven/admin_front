import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";
import MaskedInput from "react-text-mask";

import { withStyles } from "@material-ui/core/styles";

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

  TextMaskCustom = props => {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  };

  render() {
    const { TextMaskCustom } = this;
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
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              name="id"
              label="로그인ID"
              defaultValue={form.id}
              onChange={onChangeInput}
              className={textFieldFirst}
              autoFocus={true}
            />
            <TextField
              name="pw"
              label="비밀번호"
              type="password"
              defaultValue={form.pw}
              className={textField}
            />
            <TextField
              required
              name="firstname"
              label="이름"
              defaultValue={form.firstname}
              onChange={onChangeInput}
              className={textFieldFirst}
            />
            <TextField
              required
              name="lastname"
              label="성"
              defaultValue={form.lastname}
              onChange={onChangeInput}
              className={textField}
            />
            <TextField
              required
              name="birthday"
              label="생일"
              type="date"
              defaultValue={form.birthday}
              onChange={onChangeInput}
              className={textFieldFirst}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              required
              name="gender"
              label="성별"
              value={form.gender}
              onChange={onChangeInput}
              className={textField}
              select
            >
              {genders.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              name="phone"
              label="연락처(HP)"
              defaultValue={form.phone}
              onChange={onChangeInput}
              className={textFieldFirst}
              InputProps={{
                inputComponent: TextMaskCustom
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              required
              name="email"
              label="이메일"
              type="email"
              defaultValue={form.email}
              onChange={onChangeInput}
              className={textField}
            />
          </form>
        </DialogContent>
        <DialogActions className={dialogActions}>
          <Button onClick={onCloseForm} variant="outlined">
            취소
          </Button>
          <Button onClick={onSubmit} variant="outlined" color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Form.defaultProps = {
  id: "",
  firstname: "",
  lastname: "",
  birthday: "",
  gender: 10,
  phone: "",
  email: ""
};
Form.propTypes = {
  id: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  gender: PropTypes.oneOf([10, 20]).isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default withStyles(styles)(Form);
