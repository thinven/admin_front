import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import {
  Header,
  FileTree,
  Editor,
  UploadForm,
  NewFolderForm,
  DeleteForm
} from "../components";

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
   * 트리 관련 이벤트.
   */
  handleReloadTree = () => {
    this._fileTree.handleReload();
  };
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
  handleOpenNewFolderForm = () => {
    this._newFolderForm.handleOpen();
  };
  //===========================================================================

  /**
   * 삭제폼 관련 이벤트.
   */
  handleOpenDeleteForm = () => {
    this._deleteForm.handleOpen();
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
    const {
      handleReloadTree,
      handleOpenUplaodForm,
      handleOpenNewFolderForm,
      handleOpenDeleteForm
    } = this;
    const {
      classes,
      fileList,
      form,
      result,
      Actions,
      handleSendMsg
    } = this.props;
    const { contentWrap, treeWrap } = classes;
    return (
      <section className={contentWrap}>
        <Header handleOpenForm={handleOpenUplaodForm} />
        <Grid container>
          <Grid item container xs={3} className={treeWrap}>
            <FileTree
              innerRef={node => (this._fileTree = node)}
              fileList={fileList}
              form={form}
              Actions={Actions}
              handleOpenUploadForm={handleOpenUplaodForm}
              handleOpenNewFolderForm={handleOpenNewFolderForm}
              handleOpenDeleteForm={handleOpenDeleteForm}
            />
          </Grid>
          <Grid item container xs={9}>
            <Editor />
          </Grid>
        </Grid>
        <UploadForm
          innerRef={node => (this._uploadForm = node)}
          form={form}
          result={result}
          Actions={Actions}
          handleSendMsg={handleSendMsg}
          handleReloadTree={handleReloadTree}
        />
        <NewFolderForm
          innerRef={node => (this._newFolderForm = node)}
          form={form}
          result={result}
          Actions={Actions}
          handleSendMsg={handleSendMsg}
          handleReloadTree={handleReloadTree}
        />
        <DeleteForm
          innerRef={node => (this._deleteForm = node)}
          form={form}
          result={result}
          Actions={Actions}
          handleSendMsg={handleSendMsg}
          handleReloadTree={handleReloadTree}
        />
      </section>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Panel" }),
  connect(
    ({ deploymentReducer }) => ({
      result: deploymentReducer.result,
      fileList: deploymentReducer.fileList,
      form: deploymentReducer.form
    }),
    dispatch => ({
      Actions: bindActionCreators(actions, dispatch)
    })
  )
)(withRouter(Panel));
