import { authService, onAuth } from "fbase";
import { useEffect, useState } from "react";

const useGetUser = () => {
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
          email: user.email,
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
  return { init, userObj };
};

export default useGetUser;
