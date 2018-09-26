import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import { Rules } from "support/validator";
import { ValidatorConsumer } from "support/validator/Provider";

const styles = theme => ({
  input: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: "100%"
  }
});

class Input extends Component {
  state = {
    error: false,
    errmsg: ""
  };
  rules = {};
  //===========================================================================
  componentDidMount() {
    this.initComponent();
  }
  //===========================================================================
  initComponent = () => {
    Object.keys(Rules).map(rule => {
      if (this.props[rule]) {
        this.rules[rule] = {
          name: rule,
          value: this.props[rule]
        };
      }
      return rule;
    });
  };
  validate = e => {
    if (e) {
      const { onChangeInput } = this.props;
      onChangeInput(e);
    }
    let result = true;
    this.setState({
      error: false,
      errmsg: ""
    });
    Object.keys(this.rules).map(rulename => {
      let rule = this.rules[rulename];
      let report = Rules[rule.name](
        this.props.value,
        this.props.label,
        rule.value
      );
      if (report.err) {
        this.setState({
          error: report.err,
          errmsg: report.errmsg
        });
        result = false;
      }
      return rule;
    });
    return result;
  };
  //===========================================================================
  render() {
    const { error, errmsg } = this.state;
    const {
      onChangeInput,
      isEmail,
      isDate,
      isHp,
      isNumber,
      maxNumber,
      minNumber,
      maxLength,
      minLength,
      classes,
      type,
      ...other
    } = this.props;
    const { input } = classes;
    return (
      <ValidatorConsumer>
        {validator => {
          validator.addMe(this);
          return (
            <TextField
              id={this.props.name}
              error={error}
              helperText={errmsg}
              onChange={this.validate}
              onKeyUp={this.validate}
              type={type}
              className={type === "hidden" ? "" : input}
              {...other}
            />
          );
        }}
      </ValidatorConsumer>
    );
  }
}

export default withStyles(styles)(Input);
