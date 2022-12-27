import styled from "styled-components";

const IconButtonStyle = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  border-radius: 50%;

  position: relative;

  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(128, 128, 128, 0.3);
  }

  svg {
    color: var(--icon-color);
    font-size: 24px;
    pointer-events: none;
  }
`;

// const IconButton = ({ children }) => {
//   return <IconButtonStyle>{children}</IconButtonStyle>;
// };

export default IconButtonStyle;
