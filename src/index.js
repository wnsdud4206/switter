import { createStore } from "@reduxjs/toolkit";
import rootReducer from "reducers/rootReducer";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from "react-router-dom";
// import { editReducer } from "./modules/contentEditStore";

// const store = configureStore({
//   reducer: rootReducer,
//   // 편법인가?? - 참고: https://guiyomi.tistory.com/116
//   middleware: getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <React.StrictMode> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </React.StrictMode> */}
  </>,
);
