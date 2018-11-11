import React, { Component, Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

const styles = theme => ({
  controlBox: {
    float: "right",
    paddingTop: 2 * theme.spacing.unit
  },
  save: {
    fontSize: 6 * theme.spacing.unit
  }
});

class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  //===========================================================================

  render() {
    const { classes, handleSave } = this.props;
    const { controlBox, save } = classes;

    return (
      <Fragment>
        <section>
          <div className={controlBox}>
            <IconButton onClick={handleSave}>
              <SaveIcon className={save} />
            </IconButton>
          </div>
          <Typography variant="display1" gutterBottom>
            마이홈 배포관리
          </Typography>
          <Typography gutterBottom>마이홈 배포파일을 관리합니다.</Typography>
          <Divider />
        </section>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Header);
