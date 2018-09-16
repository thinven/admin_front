import React, { Component, createContext } from "react";

const Context = createContext("validator");
const { Provider, Consumer: ValidatorConsumer } = Context;

class ValidatorProvider extends Component {
  targets = {};
  validator = {
    addMe: component => {
      this.targets[component.props.name] = component;
    }
  };
  validate = () => {
    let result = true;
    Object.keys(this.targets).map(key => {
      if (!this.targets[key].validate()) result = false;
      return key;
    });
    return result;
  };
  render() {
    const { validator } = this;
    return <Provider value={validator}>{this.props.children}</Provider>;
  }
}

export { ValidatorProvider, ValidatorConsumer };
