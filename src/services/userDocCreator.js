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
    follow: [],
    follower: [],
    introduce: ""
  };
  
  const newUser = doc(dbService(), "users", uid);

  await setDoc(
    newUser,
    newUserObj,
    { capital: false },
    { merge: false },
  );

  // google이나 github 의 프로파일 이미지를 가져와서 storage에 저장하는 건 안되는 듯
  // const attachmentRef = ref(
  //   storageService(),
  //   `${authService().currentUser.uid}/profileImages/${uuidv4()}`,
  // );
  // // eslint-disable-next-line no-unused-vars
  // const response = await uploadString(
  //   attachmentRef,
  //   authService().currentUser.photoURL,
  //   "data_url",
  // );
};

export default userDocCreator;
