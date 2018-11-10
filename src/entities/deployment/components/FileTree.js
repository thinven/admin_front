import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import CachedIcon from "@material-ui/icons/Cached";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

import { TreeView } from "support/wrapper";
import { Result } from "common/constant";

const styles = theme => ({
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    width: "100%"
  }
});

class FileTree extends Component {
  componentDidMount = () => {
    this.handleReload();
  };
  //===========================================================================

  /**
   * 외부(다른 컴포넌트)와 연계
   */
  handleUploadForm = () => {
    this.handleChangeInput();
    this.props.handleOpenUploadForm();
  };
  handleNewFolderForm = () => {
    this.handleChangeInput();
    this.props.handleOpenNewFolderForm();
  };
  handleDeleteForm = () => {
    this.handleChangeInput();
    this.props.handleOpenDeleteForm();
  };
  handleChangeInput = () => {
    const { Actions } = this.props;
    let tmp = this._tree.handleSelectInfo();
    Actions.changeInput({
      name: "parentPath",
      value: tmp.key && !tmp.leaf ? tmp.key + "/" : "/"
    });
  };
  handleReload = async () => {
    const { Actions } = this.props;
    await Actions.getDeployment({});
  };
  handleLoadText = selected => {
    const { Actions, handleSendMsg } = this.props;
    Actions.getDeploymentText({ selected });
    if (this.props.result.key !== Result.SUCCESS)
      handleSendMsg(this.props.result);
  };
  //===========================================================================

  /**
   * 자체 로직
   */
  handleDelete = selected => {
    this.handleDeleteForm();
    const { Actions } = this.props;
    Actions.changeInput({
      name: "selected",
      value: selected
    });
    /*
    const { Actions } = this.props;
    Actions.delDeployment(this.props.form);
    */
  };
  //===========================================================================

  render() {
    const {
      handleUploadForm,
      handleNewFolderForm,
      handleReload,
      handleDelete,
      handleLoadText
    } = this;
    return (
      <Fragment>
        <Grid container direction="column">
          <Grid item container>
            <Tooltip title="파일 업로드폼">
              <IconButton onClick={handleUploadForm}>
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="폴더 생성폼">
              <IconButton onClick={handleNewFolderForm}>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="트리정보 새로고침">
              <IconButton onClick={handleReload}>
                <CachedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item container>
            <TreeView
              ref={ref => (this._tree = ref)}
              data={this.props.fileList}
              handleDelete={handleDelete}
              handleLoadText={handleLoadText}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(FileTree);
