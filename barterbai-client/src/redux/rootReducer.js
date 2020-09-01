import { combineReducers } from "redux";

import usersReducer from "./store/users/usersReducer";
import itemsReducer from "./store/items/itemsReducer";
import categoryReducer from "./store/category/categoryReducer";

const rootReducer = combineReducers({
  user: usersReducer,
  item: itemsReducer,
  category: categoryReducer,
});

export default rootReducer;
