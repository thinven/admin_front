import { Result } from "common/constant";

const defaults = {
  result: {
    key: Result.SUCCESS,
    desc: ""
  },
  fileList: [],
  form: {
    parentPath: "",
    folderName: "",
    selected: {}
  },
  loading: false
};

export default defaults;
