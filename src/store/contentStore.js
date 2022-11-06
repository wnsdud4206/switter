import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";
// import getSweets from "db/getSweets";

// 비동기로 하려면 createSlice로 하면 안될듯

// getSweets를 어떻게 불러와서 state의 기본값으로 사용하지??

const newSweet = createAction("NEWSWEET");
const newComment = createAction("NEWCOMMENT");

const reducer = createReducer([], {
  [newSweet.type]: (state, action) => state,
  [newComment.type]: (state, action) => state
});


export const newContentActions = { newSweet, newComment };

export default configureStore({ reducer });
