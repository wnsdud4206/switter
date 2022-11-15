import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
// import OtherUserProfile from "routes/OtherUserProfile";
import Profile from "routes/Profile";
import Header from "./header/Header";
import ContentEditor from "components/ContentEditor";
import { useSelector } from "react-redux";
import ContentBox from "./ContentBox";

const AppRouter = ({ isLoggedIn, userObj, init }) => {
  // const [otherUserId, setOtherUserId] = useState("");

  const editMode = useSelector((state) => state.editState.mode);
  const boxMode = useSelector((state) => state.boxState.mode);

  // const getId = (id) => {
  //   setOtherUserId(id);
  // };

  return (
    <Router>
      {isLoggedIn && (
        <>
          <Header userObj={userObj} />
          {editMode && <ContentEditor userObj={userObj} />}
          {boxMode && <ContentBox userObj={userObj} />}
        </>
      )}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <Home
                  userObj={userObj}
                  init={init}
                  // getId={getId}
                />
              }
            />
            {/* <Route
              path={`/${otherUserId}`}
              element={
                <OtherUserProfile userObj={userObj} otherUserId={otherUserId} />
              }
            /> */}
            <Route path="/profile" element={<Profile userObj={userObj} />} />
            {/* redirect 사라져서 이렇게 사용, 또는 Profile.js 에서 useNavigate() 사용 */}
            {/* <Route path="*" element={<Header replace to="/" />} /> */}
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
