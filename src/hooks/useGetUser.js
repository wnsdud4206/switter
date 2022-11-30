import { authService, onAuth, doc, dbService, onSnapshot } from "fbase";
import { useEffect, useState } from "react";

const useGetUser = () => {
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    onAuth(authService(), (user) => {
      if (user) {
        const userDoc = doc(dbService(), "users", user.uid);

        onSnapshot(userDoc, (snapshot) => {
          const { introduce, follower, follow } = snapshot.data();

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
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  
  return { userObj, init };
};

export default useGetUser;
