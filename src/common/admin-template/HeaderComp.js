import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    paddingLeft: 1.5 * theme.spacing.unit,
    paddingRight: 1.5 * theme.spacing.unit,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing.unit
  },
  hide: {
    display: "none"
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  none: {
    display: "none"
  }
});

class Header extends Component {
  state = {
    profileOpen: false
  };
  //===========================================================================

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.loginInfoIm !== nextProps.loginInfoIm) return true;
    if (this.state.profileOpen !== nextState.profileOpen) return true;
    return false;
  }
  //===========================================================================

  handleToggle = () => {
    this.setState(state => ({ profileOpen: !state.profileOpen }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ profileOpen: false });
  };
  //===========================================================================

  handleLoginForm = () => {
    this.props.handleLoginForm();
  };
  handleLogout = () => {
    const { LoginActions } = this.props;
    LoginActions.clearEmployeeAuth();
  };
  //===========================================================================

  render() {
    const { handleClose, handleToggle, handleLoginForm, handleLogout } = this;
    const { profileOpen } = this.state;
    const { classes, drawerOpen, onOpen, loginInfo } = this.props;
    const {
      none,
      appBar,
      appBarShift,
      menuButton,
      hide,
      grow,
      sectionDesktop
    } = classes;
    return (
      <AppBar
        position="absolute"
        color="default"
        className={classNames(appBar, drawerOpen && appBarShift)}
      >
        <Toolbar disableGutters={!drawerOpen}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={onOpen}
            className={classNames(menuButton, drawerOpen && hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography variant="title" color="inherit" noWrap>
              관리자템플릿
            </Typography>
          </Link>
          <div className={grow} />
          <nav className={sectionDesktop}>
            <IconButton
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={profileOpen ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircleIcon />
            </IconButton>
            <Popper
              open={profileOpen}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              placement="bottom-end"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom-end"
                        ? "center top"
                        : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        <MenuItem
                          onClick={handleLoginForm}
                          className={loginInfo.id ? none : ""}
                        >
                          로그인
                        </MenuItem>
                        <MenuItem
                          onClick={handleLogout}
                          className={loginInfo.id ? "" : none}
                        >
                          로그아웃
                        </MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Header));
