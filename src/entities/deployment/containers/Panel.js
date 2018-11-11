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
   * 에디터 내용 저장 이벤트.
   */
  handleSave = () => {
    const { form, Actions } = this.props;
    Actions.patchDeploymentText(form);
  };
  //===========================================================================

  render() {
    const {
      handleReloadTree,
      handleOpenUplaodForm,
      handleOpenNewFolderForm,
      handleOpenDeleteForm,
      handleSave
    } = this;
    const {
      classes,
      fileList,
      form,
      editor,
      result,
      Actions,
      handleSendMsg
    } = this.props;
    const { contentWrap, treeWrap } = classes;
    return (
      <section className={contentWrap}>
        <Header handleSave={handleSave} />
        <Grid container>
          <Grid item container xs={3} className={treeWrap}>
            <FileTree
              innerRef={node => (this._fileTree = node)}
              fileList={fileList}
              form={form}
              result={result}
              Actions={Actions}
              handleOpenUploadForm={handleOpenUplaodForm}
              handleOpenNewFolderForm={handleOpenNewFolderForm}
              handleOpenDeleteForm={handleOpenDeleteForm}
              handleSendMsg={handleSendMsg}
            />
          </Grid>
          <Grid item container xs={9}>
            <Editor
              innerRef={node => (this._editor = node)}
              form={form}
              editor={editor}
              Actions={Actions}
            />
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
      form: deploymentReducer.form,
      editor: deploymentReducer.editor
    }),
    dispatch => ({
      Actions: bindActionCreators(actions, dispatch)
    })
  )
)(withRouter(Panel));
