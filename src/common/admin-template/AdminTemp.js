import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import Header from "./HeaderComp";
import SideBar from "./SideBarComp";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class AdminTemplate extends Component {
  state = {
    drawerOpen: false
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    const { handleDrawerOpen, handleDrawerClose } = this;
    const { drawerOpen } = this.state;
    const { classes, children } = this.props;
    const { root, content, toolbar } = classes;
    return (
      <section className={root}>
        <Header drawerOpen={drawerOpen} onOpen={handleDrawerOpen} />
        <SideBar drawerOpen={drawerOpen} onClose={handleDrawerClose} />
        <main className={content}>
          <div className={toolbar} />
          {children}
        </main>
      </section>
    );
  }
}

export default withStyles(styles)(AdminTemplate);
