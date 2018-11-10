import React, { Component, Fragment } from "react";

import Tree from "rc-tree";
import "rc-tree/assets/index.css";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class TreeView extends Component {
  state = {
    anchorEl: null,
    selectedKeys: [],
    selectedInfo: {}
  };
  //===========================================================================
  handleExpand = expandedKeys => {
    //console.log('onExpand', expandedKeys, arguments);
  };
  handleSelect = (info, { selected, node }) => {
    let selectedInfo = { key: info[0], leaf: node.props.isLeaf };
    if (node.props.isLeaf) this.props.handleLoadText(selectedInfo);
    this.setState({
      selectedKeys: info,
      selectedInfo
    });
  };
  handleRightClick = info => {
    this.setState({
      anchorEl: info.event.currentTarget,
      selectedKeys: [info.node.props.eventKey],
      selectedInfo: {
        key: info.node.props.eventKey,
        leaf: info.node.props.isLeaf
      }
    });
  };
  handleSelectInfo = () => {
    return this.state.selectedInfo;
  };
  //===========================================================================

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleDelete = () => {
    this.props.handleDelete(this.handleSelectInfo());
    this.handleClose();
  };
  //===========================================================================

  render() {
    const { anchorEl } = this.state;
    return (
      <Fragment>
        <Tree
          className="myCls"
          showLine
          checkable={false}
          defaultExpandAll={false}
          onExpand={this.handleExpand}
          onSelect={this.handleSelect}
          onRightClick={this.handleRightClick}
          treeData={this.props.data}
          selectedKeys={this.state.selectedKeys}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleDelete}>삭제</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default TreeView;
