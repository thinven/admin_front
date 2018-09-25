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
  render() {
    const { classes, onOpenForm } = this.props;
    const { controlBox, add } = classes;
    return (
      <Fragment>
        <section>
          <div className={controlBox}>
            <IconButton onClick={onOpenForm}>
              <AddBoxOutlinedIcon className={add} />
            </IconButton>
          </div>
          <Typography variant="display1" gutterBottom>
            공통코드
          </Typography>
          <Typography gutterBottom>
            사이트에서 사용되는 공통코드를 관리한다.
          </Typography>
          <Divider />
        </section>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Header);
