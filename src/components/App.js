import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, onAuth } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuth(authService(), (user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {/* Loading중 같은 */}
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; Switter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
