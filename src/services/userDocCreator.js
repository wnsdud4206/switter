import { doc, dbService, setDoc } from "fbase";

const userDocCreator = async (data, pw = null) => {
  const {
    user: { displayName, email, photoURL: attachmentUrl, uid },
    // providerId,
  } = data;

  const newUserObj = {
    // providerId,
    displayName,
    email,
    attachmentUrl,
    uid,
    password: pw,
  };
  
  const newUser = doc(dbService(), "users", uid);

  await setDoc(
    newUser,
    newUserObj,
    { merge: true },
  );
};

export default userDocCreator;
