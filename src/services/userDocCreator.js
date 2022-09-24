import { doc, dbService, setDoc } from "fbase";

const userDocCreator = async (data) => {
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
};

export default userDocCreator;