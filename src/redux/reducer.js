import {combineReducers} from "redux";
import {serviceReducer} from "./serviceReducer";

export const reducer = combineReducers({
    service: serviceReducer
})
