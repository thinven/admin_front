import React, { Component, Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import { withStyles } from "@material-ui/core/styles";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

const styles = theme => ({
  controlBox: {
    float: "right",
    paddingTop: 2 * theme.spacing.unit
  },
  add: {
    fontSize: 6 * theme.spacing.unit
  }
});

class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  //===========================================================================

  render() {
    const { classes, handleOpenForm } = this.props;
    const { controlBox, add } = classes;

    return (
      <Fragment>
        <section>
          <div className={controlBox}>
            <IconButton onClick={handleOpenForm}>
              <AddBoxOutlinedIcon className={add} />
            </IconButton>
          </div>
          <Typography variant="display1" gutterBottom>
            직원
          </Typography>
          <Typography gutterBottom>
            관리자 페이지에 접속 가능한 직원를 관리한다.
          </Typography>
          <Divider />
        </section>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Header);
