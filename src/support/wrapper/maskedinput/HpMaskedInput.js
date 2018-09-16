import React from 'react';
import MaskedInput from "react-text-mask";

const HpMaskedInput = props => {
  const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
}

export default HpMaskedInput;