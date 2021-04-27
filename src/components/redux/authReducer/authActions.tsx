import Axios from "axios";
import Cookie from "js-cookie";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGN_REQUEST,
  SIGNUP_SUCCESS,
  SIGN_UP_FAIL,
} from "./constant";

export const register = (values: any) => async (dispatch) => {
  try {
    dispatch({
      type: SIGN_REQUEST,
    });

    const { data } = await Axios.post(`/auth/register`, values);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });

    localStorage.setItem("message", JSON.stringify(data.message));
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: error.response.data
        ? error.response.data
        : error.response.data.message,
    });
  }
};

export const login = (values: any) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const { data } = await Axios.post(`/auth/login`, values);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    Cookie.set("token", data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data
        ? error.response.data
        : error.response.data.message,
    });
  }
};

export const logout = async (dispatch) => {
  try {
    const { data } = await Axios.get(`/auth/logout`);

    dispatch({
      type: LOGOUT,
      payload: data,
    });
    localStorage.removeItem("user");
    window.location.reload();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data
        ? error.response.data
        : error.response.data.message,
    });
  }
};
