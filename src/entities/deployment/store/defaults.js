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
    selected: {},
    text: "",
    textKey: ""
  },
  editor: 0, //에디터의 렌더링 시점을 조정하기위한 변수
  loading: false
};

export default defaults;
