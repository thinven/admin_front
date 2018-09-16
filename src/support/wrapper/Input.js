import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";

import { Rules } from "support/validator";
import { ValidatorConsumer } from "support/validator/Provider";

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
    const { onChangeInput, isEmail, isDate, isHp, ...other } = this.props;
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
              {...other}
            />
          );
        }}
      </ValidatorConsumer>
    );
  }
}

export default Input;
