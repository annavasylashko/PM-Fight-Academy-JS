import { combineReducers } from "redux";
import { serviceReducer } from "./serviceReducer";
import { coachReducer } from "./coachReducer";
import { clientReducer } from "./clientReducer";
import { slotsReducer } from "./slotsReducer";

export const reducer = combineReducers({
  service: serviceReducer,
  coach: coachReducer,
  client: clientReducer,
  slots: slotsReducer,
});
