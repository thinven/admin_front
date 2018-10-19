import { Map, List } from "immutable";

import { Result } from "common/constant";

const defaults = Map({
  list: List(),
  genderCodes: List(),
  pages: null,
  loading: false,
  info: Map({}),
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
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  })
});

export default defaults;
