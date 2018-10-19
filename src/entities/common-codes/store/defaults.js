import { Map, List } from "immutable";

import { Result } from "common/constant";

const defaults = Map({
  list: List(),
  useCodes: List(),
  pages: null,
  loading: false,
  info: Map({}),
  form: Map({
    uid: "",
    code: "",
    name: "",
    ordered: 0,
    use: 10,
    bcgu: "",
    bcgn: ""
  }),
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  })
});

export default defaults;
