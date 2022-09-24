import { authService, createUser, signInEmail } from "fbase";
import React, { useState } from "react";
import userDocCreator from "services/userDocCreator";
import { AuthFormSpanStyle, AuthFormStyle } from "styles/AuthFormStyle";

const AuthForm = () => {
  // displayName, photoURL(attachmentUrl) 추가하기
  const [form, setForm] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

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
      userDocCreator(data);
    } catch (error) {
      console.dir(error);
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <AuthFormStyle onSubmit={onSubmit}>
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
        {error && <span id="errorText">{error}</span>}
      </AuthFormStyle>
      {/* newAccount를 true로 바꾸어 submit 이벤트의 if문에 따라 버튼을 클릭하면 이전처럼 계정생성이 아닌 로그인(Sign In 메소드)이 되는 것 */}
      <AuthFormSpanStyle onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </AuthFormSpanStyle>
    </>
  );
};

export default AuthForm;
