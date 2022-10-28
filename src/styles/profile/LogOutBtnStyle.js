import styled from "styled-components";

const LogOutBtnStyle = styled.div`
  display: flex;
  justify-content: center;

  button {
    border: none;
    outline: none;
    background: #444;
    color: #bbb;

    font-weight: bold;
    font-size: 1.2em;

    border-radius: 4px;

    padding: 8px 12px;

    transition: background 0.2s, color 0.2s;

    cursor: pointer;

    &:hover {
      background: #ff6633;
      color: #fff;
    }
  }
`;

export default LogOutBtnStyle;
