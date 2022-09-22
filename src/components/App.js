import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, onAuth } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuth(authService(), (user) => {
      if (user) {
        // setUserObj(user);
        // 5-2. 방법 1
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
        // 5-2. 방법 2
        // setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService().currentUser;
    // 5-2. 방법 1
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
    // 5-2. 방법 2
    // setUserObj(Object.assign({}, user));
  };

  return (
    <>
      {/* Loading중 같은 */}
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={userObj}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; Switter {new Date().getFullYear()}</footer> */}
    </>
  );
}

export default App;
