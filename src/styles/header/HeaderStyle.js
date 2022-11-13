import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: rgba(0, 0, 0, 0.8);

  /* margin: 0; */
  margin-top: 16px;
  padding: 8px 32px;

  box-sizing: border-box;

  // 개발자도구의 모바일로 보면 nav가 좀 위로 올라가는데 실제 모바일로보면 괜찮음
  position: sticky;
  top: 0;
  /* bottom: 869px; */
  z-index: 1;

  outline: 1px solid #777;

  div#homeLink {
    outline: 1px solid white;
  }


  a {
    text-decoration: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    /* outline: 1px solid orange; */
  }

  svg {
    /* color: #00acee; */
    color: #9953e2;
    font-size: 25px;
    pointer-events: none;
  }
`;

export default HeaderStyle;
