import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { Header, Tree, List, Form } from "../components";

const styles = theme => ({
  contentWrap: {
    padding: theme.spacing.unit,
    backgroundColor: "#f9f9f9"
  }
});

class Panel extends Component {
  //===========================================================================

  /**
   * 신규등록폼 관련 이벤트.
   */
  handleOpenForm = () => {
    this._form.handleOpen();
  };
  //===========================================================================

  /**
   * 수정폼 관련 이벤트.
   */
  handleOpenEditForm = original => {
    this._form.handleOpenEdit(original);
  };
  //===========================================================================

  /**
   * 삭제 관련 이벤트.
   */
  handleDeleteConfirm = original => {
    const { Actions, handleConfirm } = this.props;
    Actions.loadEmployee({
      info: original
    });
    handleConfirm({
      title: "삭제 알림",
      desc: original.id + "님을 삭제 하시겠습니까?",
      onOk: async () => {
        try {
          await Actions.delEmployee(original);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
  //===========================================================================

  render() {
    const { classes } = this.props;
    const { contentWrap } = classes;
    const { handleOpenForm } = this;

    return (
      <section className={contentWrap}>
        <Header handleOpenForm={handleOpenForm} />
        <Grid container>
          <Grid item container xs={3}>
            <Tree />
          </Grid>
          <Grid item container xs={9}>
            <List />
          </Grid>
        </Grid>
        <Form />
      </section>
    );
  }
}

export default compose(withStyles(styles, { name: "Panel" }))(
  withRouter(Panel)
);
