import { createAction, createReducer } from "@reduxjs/toolkit";

const dark = createAction("DARKMODE/DARK");
const light = createAction("DARKMODE/LIGHT");

const initialState = {
  mode:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: Dark)").matches,
};

export const darkModeReducer = createReducer(initialState, {
  [dark.type]: (state, action) => {
    state.mode = action.payload.mode;
  },
  [light.type]: (state, action) => {
    state.mode = action.payload.mode;
  },
});

export const darkModeActions = { dark, light };
