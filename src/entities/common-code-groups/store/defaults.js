import { Result } from "common/constant";

const defaults = {
  list: [],
  pages: {},
  loading: false,
  info: {},
  form: {
    uid: "",
    name: "",
    ordered: 0,
    use: 10
  },
  result: {
    key: Result.SUCCESS,
    desc: ""
  }
};

export default defaults;
