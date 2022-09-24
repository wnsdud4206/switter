import styled from "styled-components";

const AuthFormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    width: 100%;
    height: 36px;
    background: white;
    outline: none;
    border: none;
    border-radius: 18px;

    padding: 0 12px;

    box-sizing: border-box;

    &[type="submit"] {
      background: #00acee;
      color: white;

      cursor: pointer;
    }
  }

  span#errorText {
    text-align: center;
    color: #ff6633;
  }
`;

const AuthFormSpanStyle = styled.span`
  color: #00acee;
  text-decoration-line: underline;

  margin: 12px 0;

  cursor: pointer;
`;

export { AuthFormStyle, AuthFormSpanStyle };

// <form onSubmit={onSubmit}>
// <input
//   name="email"
//   type="email"
//   placeholder="Email"
//   required
//   value={form.name}
//   onChange={onChange}
// />
// <input
//   name="password"
//   type="password"
//   placeholder="Password"
//   required
//   value={form.password}
//   onChange={onChange}
// />
// <input type="submit" value={newAccount ? "Create Accont" : "Log In"} />
// {error}
// </form>
// {/* newAccount를 true로 바꾸어 submit 이벤트의 if문에 따라 버튼을 클릭하면 이전처럼 계정생성이 아닌 로그인(Sign In 메소드)이 되는 것 */}
// <span onClick={toggleAccount}>
// {newAccount ? "Sign In" : "Create Account"}
// </span>
