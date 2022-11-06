import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from "react-router-dom";
import store from "./store/contentStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <React.StrictMode> */}
    <Provider store={store}>
    <App /></Provider>
    {/* </React.StrictMode> */}
  </>,
);
