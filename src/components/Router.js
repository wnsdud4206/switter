import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./nav/Navigation";
import NavScrollProgress from "./nav/NavScrollProgress";
import ScrollTopButton from "./ScrollTopButton";

const AppRouter = ({ isLoggedIn, userObj, init }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <NavScrollProgress />
                  <Home userObj={userObj} init={init} />
                  <ScrollTopButton />
                </>
              }
            />
            <Route path="/profile" element={<Profile userObj={userObj} />} />
            {/* redirect 사라져서 이렇게 사용, 또는 Profile.js 에서 useNavigate() 사용 */}
            <Route path="*" element={<Navigation replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
