import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;

  background-color: var(--background-color);
  /* background-color: rgba(0, 0, 0, 0.8); */

  width: 100%;
  
  /* margin: 0; */
  /* margin-top: 16px; */
  padding: 18px 36px;
  border-bottom: 1px solid var(--border-color);
  /* border-bottom-color: var(--border-color); */
  box-sizing: border-box;

  // 개발자도구의 모바일로 보면 nav가 좀 위로 올라가는데 실제 모바일로보면 괜찮음
  position: fixed;
  top: 0;
  /* bottom: 869px; */
  z-index: 1;

  transition: background-color .2s;

  div#homeLink {
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
    color: var(--icon-color);
    font-size: 25px;
    pointer-events: none;
  }
`;

export default HeaderStyle;
