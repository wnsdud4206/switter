import { authService, createUser, signIn } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState("");
  const onChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = authService();
      if (newAccount) {
        data = await createUser(auth, form.email, form.password);
      } else {
        data = await signIn(auth, form.email, form.password);
      }
      console.log(data);
    } catch(error) {
      console.dir(error);
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev => !prev));
  
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
      <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
