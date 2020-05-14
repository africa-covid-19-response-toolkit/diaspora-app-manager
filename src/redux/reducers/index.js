import { combineReducers } from "redux";

import users from "./users";
import messages from "./messages";
import layout from "./layout";
import questions from "./questions";

const rootReducer = combineReducers({
  users,
  messages,
  layout,
  questions,
});

export default rootReducer;
