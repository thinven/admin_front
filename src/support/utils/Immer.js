import produce from "immer";

import { Result } from "common/constant";

const reducer = {
  func: fn => {
    return (state, action) => {
      return produce(state, draft => {
        fn(draft, action);
      });
    };
  },
  stri: (type, reduce) => ({
    type,
    onSuccess: (state, action) => {
      const { key, desc } = action.payload.data;
      return produce(state, draft => {
        if (key === Result.SUCCESS) {
          reduce(draft, action, () => {});
        }
        draft.key = key;
        draft.desc = desc;
      });
    }
  })
};

const Immer = (o1, o2) => {
  let oType = typeof o1;
  return reducer[oType.slice(0, 4)](o1, o2);
};

export default Immer;
