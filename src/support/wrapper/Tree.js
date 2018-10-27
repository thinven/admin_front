import React, { Component } from "react";

import Tree from "rc-tree";
import 'rc-tree/assets/index.css';


class TreeView extends Component {
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys, arguments);
  };
  onSelect = (info) => {
    console.log('selected', info);
  }
  onRightClick = (info) => {
    console.log('right click', info.node.props);
  }
  //===========================================================================

  render() {
    return (
      <Tree
        className="myCls"
        showLine
        checkable={false}
        selectable
        defaultExpandAll={false}
        onExpand={this.onExpand}
        onSelect={this.onSelect}
        onRightClick={this.onRightClick}
        treeData={this.props.data}
      />
    );
  }
}

export default TreeView;
