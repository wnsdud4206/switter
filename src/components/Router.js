import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Header from "./header/Header";
import ContentEditor from "components/content/ContentEditor";
import { useSelector } from "react-redux";
import ContentBox from "./content/ContentBox";

const AppRouter = ({ userObj }) => {
  const editMode = useSelector((state) => state.editState.mode);
  const boxMode = useSelector((state) => state.boxState.mode);

  return (
    <Router>
      {userObj && (
        <>
          <Header userObj={userObj} />
          {editMode && <ContentEditor userObj={userObj} />}
          {boxMode && <ContentBox userObj={userObj} />}
        </>
      )}
      <Routes>
        {userObj ? (
          <>
            <Route
              path="/"
              element={
                <Home
                  userObj={userObj}
                />
              }
            />
            <Route
              path="/profile/:name"
              element={<Profile userObj={userObj} />}
            />
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
