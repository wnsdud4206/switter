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
    // notification: {
    //   unconfirmed: [],
    //   confirmed: [],
    // },
  };
  // addDoc으로 문서이름을 랜덤으로 만들지 않고 setDoc으로 이름을 지정, 그럼 기존 문서에 덮어씌우는 불필요한 동작이 되지 않도록 공식문서를 참고해 setDoc의 capitla, merge를 사용?
  const newUser = doc(dbService(), "users", uid);
  // eslint-disable-next-line no-unused-vars
  const docRef = await setDoc(
    newUser,
    newUserObj,
    { capital: false },
    { merge: false },
  );
  // capital, merge를 다뤄도 무조건 덮어씌우는데?

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
