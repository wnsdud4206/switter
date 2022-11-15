import { combineReducers } from "@reduxjs/toolkit";
import { editReducer } from "./contentEditReducer";
import { contentBoxReducer } from "./contentBoxReducer";

const rootReducer = combineReducers({
  editState: editReducer,
  boxState: contentBoxReducer
});

export default rootReducer;
