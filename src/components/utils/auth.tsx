import Cookie from "js-cookie";

export const isAuth = () => {
  if (process.browser) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
  }
};

export const getCookie = (key: string) => {
  if (process.browser) {
    return Cookie.get(key);
  }
};

export const OwnSub = (sub, isAuth) => {
  if (process.browser && isAuth()) {
    if (sub && isAuth()) {
      return isAuth().user.username === sub.username;
    }
  }
};
