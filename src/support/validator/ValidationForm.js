import React, { Component } from "react";

import { ValidatorProvider } from "./Provider";

class ValidationForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    if (this.validator.validate()) {
      const { onSubmit } = this.props;
      onSubmit();
    }
  };
  //===========================================================================
  render() {
    const { handleSubmit } = this;
    const { children } = this.props;
    return (
      <ValidatorProvider ref={ref => (this.validator = ref)}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          {children}
        </form>
      </ValidatorProvider>
    );
  }
}

export default ValidationForm;
