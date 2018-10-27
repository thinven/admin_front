import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

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
  componentDidMount = async () => {
    const { Actions } = this.props;
    await Actions.getDeployment({});
  };
  //===========================================================================

  handleUploadForm = () => {
    const { handleOpenUploadForm } = this.props;
    handleOpenUploadForm();
  };
  handleNewFolderForm = () => {};
  //===========================================================================

  render() {
    const { handleUploadForm, handleNewFolderForm } = this;
    return (
      <Fragment>
        <IconButton onClick={handleUploadForm}>
          <CloudUploadIcon />
        </IconButton>
        <IconButton onClick={handleNewFolderForm}>
          <CreateNewFolderIcon />
        </IconButton>{" "}
        <TreeView data={this.props.fileList} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(FileTree);
