import moment from "moment";

const isExisty = function(value) {
  return value !== null && value !== undefined;
};

const isEmpty = function(value) {
  if (value instanceof Array) {
    return value.length === 0;
  }
  return value === "" || value === undefined || value === null;
};

const isEmptyTrimed = function(value) {
  if (typeof value === "string") {
    return value.trim() === "";
  }
  return true;
};
const isString = value =>
  !isEmpty(value) || typeof value === "string" || value instanceof String;

const validations = {
  matchRegexp: (value, label, regexp) => {
    const validationRegexp =
      regexp instanceof RegExp ? regexp : new RegExp(regexp);
    let err = !(
      isExisty(value) &&
      !isEmpty(value) &&
      validationRegexp.test(value)
    );
    let msg = "";
    if (err) msg = label + " 형식에 맞게 입력해 주세요.";
    return {
      err: err,
      errmsg: msg
    };
  },

  isEmail: (value, label) =>
    validations.matchRegexp(
      value,
      label,
      // eslint-disable-next-line
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    ),
  isEmpty: value => isEmpty(value),

  required: (value, label) => {
    let err = isEmpty(value);
    let msg = "";
    if (err) msg = label + " 항목은 입력해 주세요.";
    return { err: err, errmsg: msg };
  },

  trim: value => !isEmptyTrimed(value),

  isNumber: (value, label) =>
    validations.matchRegexp(value, label, /^-?[0-9]\d*(\d+)?$/i),

  isFloat: value =>
    validations.matchRegexp(value, /^(?:[1-9]\d*|0)?(?:\.\d+)?$/i),

  isPositive: value => {
    if (isExisty(value)) {
      return (
        (validations.isNumber(value) || validations.isFloat(value)) &&
        value >= 0
      );
    }
    return true;
  },

  maxNumber: (value, label, max) => {
    let err =
      !isExisty(value) ||
      isEmpty(value) ||
      parseInt(value, 10) > parseInt(max, 10);
    let msg = "";
    if (err) msg = label + " 항목은 최대 " + max + "이하로 입력해 주세요.";
    return { err: err, errmsg: msg };
  },

  minNumber: (value, label, min) => {
    let err =
      !isExisty(value) ||
      isEmpty(value) ||
      parseInt(value, 10) < parseInt(min, 10);
    let msg = "";
    if (err) msg = label + " 항목은 최대 " + min + "이상으로 입력해 주세요.";
    return { err: err, errmsg: msg };
  },
  minLength: (value, label, length) => {
    let err = !(isString(value) && value.length >= length);
    let msg = "";
    if (err) msg = label + " 항목은 최소 " + length + "문자이상 입력해 주세요.";
    return { err: err, errmsg: msg };
  },
  maxLength: (value, label, length) => {
    let err = !(isString(value) && value.length <= length);
    let msg = "";
    if (err)
      msg = label + " 항목은 최대 " + length + "문자이하로 입력해 주세요.";
    return { err: err, errmsg: msg };
  },
  isDate: (value, label) => {
    let err = !moment(value).isValid();
    let msg = "";
    if (err) msg = label + " 형식(날짜)에 맞게 입력해 주세요.";
    return { err: err, errmsg: msg };
  }
};

export default validations;
