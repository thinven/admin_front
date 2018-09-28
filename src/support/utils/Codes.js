const Codes = {
  label: (codes, val) => {
    let sel = codes.filter(code => code.value * 1 === val);
    if (sel.length > 0) return sel[0].label;
    return "";
  }
};

export default Codes;
