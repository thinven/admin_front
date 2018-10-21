import { Result } from "common/constant";

const defaults = {
  list: [],
  genderCodes: [],
  pages: [],
  loading: false,
  info: {},
  form: {
    uid: "",
    firstname: "",
    lastname: "",
    birthday: "",
    gender: 10,
    phone: "",
    email: "",
    id: "",
    rolejson: ""
  },
  result: {
    key: Result.SUCCESS,
    desc: ""
  }
};

export default defaults;
