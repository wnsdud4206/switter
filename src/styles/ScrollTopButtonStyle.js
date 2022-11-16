import styled from "styled-components";

// 위로 볼록한 모양은 다음에 구현해보기
/* clip-path: circle(25px at 25px 25px); */

const ScrollTopButtonStyle = styled.button`
  border: none;
  outline: none;

  display: flex;
  justify-content: center;

  /* background-color: #00bdee; */
  background-color: var(--personal-color);

  width: 50px;
  height: 50px;

  border-radius: 50%;

  position: fixed;
  left: 50vw;
  bottom: 0;

  transform: translate(-50%, 110%);

  transition: transform .2s;

  cursor: pointer;

  &.up {
    transform: translate(-50%, 50%);

    &:hover {
      transform: translate(-50%, 50%) scale(1.1, 1.1);
    }
  }
  
  svg {
    color: white;

    width: 24px;
    height: 24px;
  }
`;

export default ScrollTopButtonStyle;
