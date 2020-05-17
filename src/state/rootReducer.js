import { combineReducers } from "redux-immutable";

import auth from "../views/auth/auth.reducer";
import dashboard from "../views/dashboard/dashboard.reducer";

const rootReducer = combineReducers({
  auth,
  dashboard,
});

export default rootReducer;
