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
          const { displayName, uid, photoURL, email } = user;

          setUserObj({
            displayName,
            uid,
            photoURL,
            email,
            introduce: snapshot.data()?.introduce || "",
            follower: snapshot.data()?.follower || [],
            follow: snapshot.data()?.follow || [],
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
