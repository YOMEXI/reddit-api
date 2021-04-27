import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGN_REQUEST,
  SIGNUP_SUCCESS,
  SIGN_UP_FAIL,
} from "./constant";

export const authReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SIGN_REQUEST:
      return {
        loading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        loading: false,
        registered: true,
        success: action.payload.message,
      };

    case SIGN_UP_FAIL:
      return {
        loading: false,
        registered: false,
        error: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        loading: false,
        loggedIn: true,
        success: action.payload.message,
      };

    case LOGIN_FAIL:
      return {
        loading: false,
        loggedIn: false,
        user: action.payload,
      };

    case LOGIN_REQUEST:
      return {
        loading: true,
      };

    case LOGOUT:
      return {
        loading: false,
        loggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};
