import {combineReducers} from "@reduxjs/toolkit";
import UserReducer from "./User";
import SearchReducer from "./Search";

const allReducers = combineReducers({
    User: UserReducer,
    Search: SearchReducer,
});

export default allReducers;
