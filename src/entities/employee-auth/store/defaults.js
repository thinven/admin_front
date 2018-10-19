import { Map } from "immutable";

import { Result } from "common/constant";

const defaults = Map({
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  }),
  form: Map({
    id: "",
    pw: "",
    rk: ""
  }),
  info: Map({
    rk: localStorage.getItem("rk"),
    id: localStorage.getItem("id"),
    firstname: localStorage.getItem("firstname"),
    lastname: localStorage.getItem("lastname"),
    pkm2: localStorage.getItem("pkm2"),
    pke2: localStorage.getItem("pke2")
  })
});

export default defaults;
