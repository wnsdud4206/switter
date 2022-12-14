import { combineReducers } from "@reduxjs/toolkit";
import { editReducer } from "./contentEditReducer";
import { contentBoxReducer } from "./contentBoxReducer";
import { darkModeReducer } from "./darkModeReducer";
import { SideBarReducer } from "./SideBarReducer";

const rootReducer = combineReducers({
  editState: editReducer,
  boxState: contentBoxReducer,
  darkModeState: darkModeReducer,
  sideBarState: SideBarReducer,
});

export default rootReducer;
