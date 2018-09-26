import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";

import Header from "./HeaderComp";
import SideBar from "./SideBarComp";

import { Message, Confirm } from "support/wrapper";

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
    drawerOpen: false,
    msgOpen: false,
    desc: ""
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleSendMsg = ({ desc }) => {
    this.setState({
      msgOpen: true,
      desc: desc
    });
  };
  handleCloseMsg = () => {
    this.setState({
      msgOpen: false
    });
  };
  handleConfirm = actions => {
    this.alert.handleOpen(actions);
  };
  render() {
    const { handleDrawerOpen, handleDrawerClose, handleCloseMsg } = this;
    const { drawerOpen, msgOpen, desc } = this.state;
    const { classes, children } = this.props;
    const { root, content, toolbar } = classes;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        handleSendMsg: this.handleSendMsg,
        handleConfirm: this.handleConfirm
      })
    );
    return (
      <Fragment>
        <section className={root}>
          <Header drawerOpen={drawerOpen} onOpen={handleDrawerOpen} />
          <SideBar drawerOpen={drawerOpen} onClose={handleDrawerClose} />
          <main className={content}>
            <div className={toolbar} />
            {childrenWithProps}
          </main>
        </section>
        <Message open={msgOpen} desc={desc} onClose={handleCloseMsg} />
        <Confirm ref={ref => (this.alert = ref)} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(AdminTemplate);
