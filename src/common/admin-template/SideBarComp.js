import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import BallotIcon from "@material-ui/icons/Ballot";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class SideBar extends Component {
  nextPath(path) {
    this.props.history.push(path);
  }
  //===========================================================================

  render() {
    const { classes, theme, drawerOpen, onClose } = this.props;
    const { drawerPaper, drawerPaperClose, toolbar } = classes;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(drawerPaper, !drawerOpen && drawerPaperClose)
        }}
        open={drawerOpen}
      >
        <div className={toolbar}>
          <IconButton onClick={onClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => this.nextPath("/")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="대시보드" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => this.nextPath("/admin/employees")}>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="직원" />
          </ListItem>
          <ListItem button onClick={() => this.nextPath("/admin/commoncodes")}>
            <ListItemIcon>
              <BallotIcon />
            </ListItemIcon>
            <ListItemText primary="공통코드" />
          </ListItem>
          <ListItem button onClick={() => this.nextPath("/admin/deployment")}>
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary="마이홈 소스관리" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(SideBar));
