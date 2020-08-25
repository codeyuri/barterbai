import { combineReducers } from "react-redux";

import usersReducer from "./store/users/usersReducer";

const rootReducer = combineReducers({
  user: usersReducer,
});

export default rootReducer;
