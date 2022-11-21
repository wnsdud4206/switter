import { combineReducers } from "@reduxjs/toolkit";
import { editReducer } from "./contentEditReducer";
import { contentBoxReducer } from "./contentBoxReducer";
import { darkModeReducer } from "./darkModeReducer";

const rootReducer = combineReducers({
  editState: editReducer,
  boxState: contentBoxReducer,
  darkModeState: darkModeReducer,
});

export default rootReducer;
