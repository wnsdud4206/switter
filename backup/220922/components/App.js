import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, onAuth } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuth(authService(), (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
  }

  return (
    <>
      {/* Loading중 같은 */}
      {init ? (
        <AppRouter isLoggedIn={userObj} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; Switter {new Date().getFullYear()}</footer> */}
    </>
  );
}

export default App;
