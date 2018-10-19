import { Map, List } from "immutable";

import { Result } from "common/constant";

const defaults = Map({
  list: List(),
  pages: null,
  loading: false,
  info: Map({}),
  form: Map({
    uid: "",
    name: "",
    ordered: 0,
    use: 10
  }),
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  })
});

export default defaults;
