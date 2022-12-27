import { createAction, createReducer } from "@reduxjs/toolkit";

const toggleSideBar = createAction("BOX/ONTOGGLESIDEBAR");

const initialState = {
  mode: false,
};

export const SideBarReducer = createReducer(initialState, {
  [toggleSideBar.type]: (state, action) => {
    return (state = { mode: action.payload });
  },
});

export const sideBarActions = { toggleSideBar };
