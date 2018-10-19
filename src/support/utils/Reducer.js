import { Result } from "common/constant";

const ApiSuccess = (state, action, reduce) => {
  const { key, desc } = action.payload.data;
  if (key === Result.SUCCESS)
    return reduce(state, action, () => {})
      .setIn(["result", "key"], key)
      .setIn(["result", "desc"], desc);
  else
    return state.setIn(["result", "key"], key).setIn(["result", "desc"], desc);
};

export default ApiSuccess;
