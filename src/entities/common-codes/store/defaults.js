import { Result } from "common/constant";

const defaults = {
  list: [],
  useCodes: [],
  pages: [],
  loading: false,
  info: {},
  form: {
    uid: "",
    code: "",
    name: "",
    ordered: 0,
    use: 10,
    bcgu: "",
    bcgn: ""
  },
  result: {
    key: Result.SUCCESS,
    desc: ""
  }
};

export default defaults;
