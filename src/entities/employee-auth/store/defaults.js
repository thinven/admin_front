import { Result } from "common/constant";

const defaults = {
  result: {
    key: Result.SUCCESS,
    desc: ""
  },
  form: {
    id: "",
    pw: "",
    rk: ""
  },
  info: {
    rk: localStorage.getItem("rk"),
    id: localStorage.getItem("id"),
    firstname: localStorage.getItem("firstname"),
    lastname: localStorage.getItem("lastname"),
    pkm2: localStorage.getItem("pkm2"),
    pke2: localStorage.getItem("pke2")
  }
};

export default defaults;
