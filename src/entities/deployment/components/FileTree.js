import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import CachedIcon from "@material-ui/icons/Cached";
import Tooltip from "@material-ui/core/Tooltip";

import { TreeView } from "support/wrapper";

const styles = theme => ({
  buttonWrap: {
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class FileTree extends Component {
  componentDidMount = () => {
    this.handleReload();
  };
  //===========================================================================

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
  //===========================================================================

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
      handleDelete
    } = this;
    return (
      <Fragment>
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
        <TreeView
          ref={ref => (this._tree = ref)}
          data={this.props.fileList}
          handleDelete={handleDelete}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(FileTree);
