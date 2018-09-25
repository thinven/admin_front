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
import { Input, AutoComplete } from "support/wrapper";

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
  //===========================================================================
  render() {
    const {
      classes,
      form,
      useCodes,
      formOpen,
      onCloseForm,
      onSubmit,
      onChangeInput,
      onLoadOptions,
      onAutoCompleteChange
    } = this.props;
    const { buttonWrap, button } = classes;

    return (
      <Dialog
        onClose={onCloseForm}
        aria-labelledby="simple-dialog-title"
        open={formOpen}
      >
        <DialogTitle id="simple-dialog-title">공통코드 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            등록된 코드는 와스 재기동후에야 정상적으로 동작합니다.
            <br />
            코드는 숫자로만 기입해 주세요.
          </DialogContentText>
          <ValidationForm onSubmit={onSubmit}>
            <Input type="hidden" name="uid" value={form.uid} />
            <Grid container>
              <Grid item container xs={12}>
                <AutoComplete
                  label={"공통코드그룹"}
                  placeholder={"입력문자열로 자동검색합니다."}
                  name={"bcg"}
                  value={{ label: form.bcgn, value: form.bcgu }}
                  loadOptions={onLoadOptions}
                  onChanges={onAutoCompleteChange}
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
                    onChangeInput={onChangeInput}
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
                    onChangeInput={onChangeInput}
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
                    onChangeInput={onChangeInput}
                  />
                </Grid>
                <Grid item container xs={6}>
                  <Input
                    required
                    name="use"
                    label="사용여부"
                    value={form.use}
                    onChangeInput={onChangeInput}
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
