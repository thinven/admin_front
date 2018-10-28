import React, { Component } from "react";

import { ValidatorProvider } from "./Provider";

class ValidationForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    if (this._validator.validate()) this.props.onSubmit();
  };
  //===========================================================================
  render() {
    const { handleSubmit } = this;
    const { children } = this.props;
    return (
      <ValidatorProvider ref={ref => (this._validator = ref)}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          {children}
        </form>
      </ValidatorProvider>
    );
  }
}

export default ValidationForm;
