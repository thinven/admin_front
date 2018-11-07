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

const styles = theme => ({
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class DeleteForm extends Component {
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
    try {
      await Actions.delDeployment(form);
      if (this.props.result.key === Result.SUCCESS) {
        handleReloadTree();
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
    const { handleClose, handleSubmit } = this;
    const { classes, form } = this.props;
    const { buttonWrap, button } = classes;
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">
          {form.selected.leaf ? "파일" : "폴더"} 삭제
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            선택한 {form.selected.leaf ? "파일을" : "폴더를"} 삭제하시겠습니까?
          </DialogContentText>
          <ValidationForm onSubmit={handleSubmit}>
            <Grid container className={buttonWrap}>
              <Grid item container xs={12}>
                <ul>
                  <li>{form.selected.key}</li>
                </ul>
              </Grid>
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
                  삭제
                </Button>
              </Grid>
            </Grid>
          </ValidationForm>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(DeleteForm);
