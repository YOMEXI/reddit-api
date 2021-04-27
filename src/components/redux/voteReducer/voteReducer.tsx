import { VOTE_FAIL, VOTE_REQUEST, VOTE_SUCCESS } from "./constant";

export const authReducer = (state = {}, action: any) => {
  switch (action.type) {
    case VOTE_REQUEST:
      return {
        loading: true,
      };

    default:
      return state;
  }
};
