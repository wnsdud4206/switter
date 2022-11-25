import { authService, onAuth, doc, dbService, onSnapshot } from "fbase";
import { useEffect, useState } from "react";

const useGetUser = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuth(authService(), (user) => {
      if (user) {
        const userDoc = doc(dbService(), "users", user.uid);

        onSnapshot(userDoc, (snapshot) => {
          const { introduce, follower, follow } = snapshot.data();
          // setUserObj(user);
          // 5-2. 방법 1
          setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            introduce,
            follower: follower || [],
            follow: follow || [],
            updateProfile: (args) => user.updateProfile(args),
          });
          // 5-2. 방법 2
          // setUserObj(user);
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return { init, userObj };
};

export default useGetUser;
