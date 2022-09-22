import {
  authService,
  createUser,
  signInEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInSocial,
  addDoc,
  collection,
  dbService,
  doc,
  setDoc,
} from "fbase";
import React, { useState } from "react";
// 회원탈퇴는?

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const usersDocCreator = async (data) => {
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
    const docRef = await setDoc(newUser, newUserObj, { capital: false }, { merge: false });
    // capital, merge를 다뤄도 무조건 덮어씌우는데?
  }
  
  const onChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    // email/password로 계정을 생성하면 google, github와는 다르게 providerId와 displayName, photoURL가 null인 상태인 문제가 발생 
    try {
      let data;
      const auth = authService();
      if (newAccount) {
        data = await createUser(auth, form.email, form.password);
      } else {
        data = await signInEmail(auth, form.email, form.password);
      }

      // email/password는 displayName 등등 유저 정보가 null로 생성되는 문제 
      usersDocCreator(data);
    } catch (error) {
      console.dir(error);
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      }
      const data = await signInSocial(authService(), provider);
      
      usersDocCreator(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.name}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Accont" : "Log In"} />
        {error}
      </form>
      {/* newAccount를 true로 바꾸어 submit 이벤트의 if문에 따라 버튼을 클릭하면 이전처럼 계정생성이 아닌 로그인(Sign In 메소드)이 되는 것 */}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
