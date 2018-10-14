import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";

import { withStyles } from "@material-ui/core/styles";

import Header from "./HeaderComp";
import SideBar from "./SideBarComp";

import { Message, Confirm } from "support/wrapper";
import { LoginForm } from "entities/employee-auth/components";
import * as loginFormActions from "entities/employee-auth/store/form";

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
  //===========================================================================

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
    this._alert.handleOpen(actions);
  };
  handleLoginForm = () => {
    this._loginForm.handleOpen();
  };
  //===========================================================================

  render() {
    const {
      handleDrawerOpen,
      handleDrawerClose,
      handleCloseMsg,
      handleSendMsg,
      handleLoginForm
    } = this;
    const { drawerOpen, msgOpen, desc } = this.state;
    const {
      classes,
      children,
      loginForm,
      loginResult,
      loginInfo,
      loginInfoIm,
      LoginFormActions
    } = this.props;
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
          <Header
            handleLoginForm={handleLoginForm}
            loginInfoIm={loginInfoIm}
            loginInfo={loginInfo}
            LoginFormActions={LoginFormActions}
            drawerOpen={drawerOpen}
            onOpen={handleDrawerOpen}
          />
          <SideBar drawerOpen={drawerOpen} onClose={handleDrawerClose} />
          <main className={content}>
            <div className={toolbar} />
            {childrenWithProps}
          </main>
        </section>
        <Message open={msgOpen} desc={desc} onClose={handleCloseMsg} />
        <Confirm ref={ref => (this._alert = ref)} />
        <LoginForm
          innerRef={node => (this._loginForm = node)}
          form={loginForm}
          result={loginResult}
          info={loginInfo}
          FormActions={LoginFormActions}
          handleSendMsg={handleSendMsg}
        />
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles, { name: "AdminTemplate" }),
  connect(
    ({ employeeAuthForm }) => ({
      loginForm: employeeAuthForm.get("form").toJS(),
      loginResult: employeeAuthForm.get("result").toJS(),
      loginInfo: employeeAuthForm.get("info").toJS(),
      loginInfoIm: employeeAuthForm.get("info")
    }),
    dispatch => ({
      LoginFormActions: bindActionCreators(loginFormActions, dispatch)
    })
  )
)(withRouter(AdminTemplate));
