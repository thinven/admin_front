const Codes = {
  label: (codes, val) => codes.filter(code => code.value * 1 === val)[0].label
};

export default Codes;
