import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({isLoggedIn}) => {
  // Hooks Component?
  return (
    <Router>
      <Routes>
        {/* {isLoggedIn ? (
          // Route 안에는 Route만
          <Route path="/" element={<Home />}></Route>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )} */}

        {/* 간결하게 */}
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
