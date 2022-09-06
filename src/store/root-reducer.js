import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer.js";
import { dataReducer } from "./data/data.reducer.js";

export const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});
