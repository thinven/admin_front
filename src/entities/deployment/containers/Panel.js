import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { Header, FileTree, List, UploadForm } from "../components";

import * as actions from "../store/reducer";

const styles = theme => ({
  contentWrap: {
    padding: theme.spacing.unit,
    backgroundColor: "#f9f9f9"
  },
  treeWrap: {
    overflow: "hidden"
  }
});

class Panel extends Component {
  //===========================================================================

  /**
   * 신규등록폼 관련 이벤트.
   */
  handleOpenUplaodForm = () => {
    this._uploadForm.handleOpen();
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
    const { classes, fileList, Actions } = this.props;
    const { contentWrap, treeWrap } = classes;
    const { handleOpenUplaodForm } = this;
    return (
      <section className={contentWrap}>
        <Header handleOpenForm={handleOpenUplaodForm} />
        <Grid container>
          <Grid item container xs={3} className={treeWrap}>
            <FileTree
              fileList={fileList}
              Actions={Actions}
              handleOpenUploadForm={handleOpenUplaodForm}
            />
          </Grid>
          <Grid item container xs={9}>
            <List />
          </Grid>
        </Grid>
        <UploadForm innerRef={node => (this._uploadForm = node)} />
      </section>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Panel" }),
  connect(
    ({ deploymentReducer }) => ({
      fileList: deploymentReducer.fileList
    }),
    dispatch => ({
      Actions: bindActionCreators(actions, dispatch)
    })
  )
)(withRouter(Panel));
