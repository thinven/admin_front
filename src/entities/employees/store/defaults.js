import { Map, List } from "immutable";

import { Result } from "common/constant";

const defaults = Map({
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  }),
  form: Map({
    uid: "",
    firstname: "",
    lastname: "",
    birthday: "",
    gender: 10,
    phone: "",
    email: "",
    id: "",
    rolejson: ""
  }),
  info: Map({}),
  list: List(),
  genderCodes: List(),
  pages: null,
  loading: false
});

export default defaults;
