import { createAction, createReducer } from "@reduxjs/toolkit";

const onContentBox = createAction("BOX/ONCONTENTBOX");
const offContentBox = createAction("BOX/OFFCONTENTBOX");

const initialState = {
  mode: false,
  content: null,
};

export const contentBoxReducer = createReducer(initialState, {
  [onContentBox.type]: (state, action) => {
    return (state = { mode: true, content: action.payload });
  },
  [offContentBox.type]: (state, action) => {
    return (state = { mode: false, content: null });
  },
});

export const boxActions = { onContentBox, offContentBox };
