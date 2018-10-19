import { Map, List } from "immutable";

import { Result } from "common/constant";

const defaults = Map({
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  }),
  list: List(),
  pages: null,
  loading: false
});

export default defaults;
