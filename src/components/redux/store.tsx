import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//
import { authReducer } from "./authReducer/authReducer";

const reducer = combineReducers({ auth: authReducer });

const AuthDetails =
  typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

//

const middleware = [thunk];
const initialState = {
  auth: { Authdetails: AuthDetails },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
