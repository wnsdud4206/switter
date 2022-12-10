import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { darkModeActions } from "reducers/darkModeReducer";
import styled from "styled-components";

const DarkModeButtonStyle = styled.button`
  outline: none;
  background: none;
  border: none;
  padding: 0;

  width: 25px;
  height: 25px;

  cursor: pointer;

  svg {
    color: var(--icon-color);
    font-size: 25px;
  }
`;

const DarkModeButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkModeState.mode);

  const onDarkModeToggle = () =>
    darkMode
      ? dispatch(darkModeActions.light({ mode: false }))
      : dispatch(darkModeActions.dark({ mode: true }));

  return (
    <DarkModeButtonStyle onClick={onDarkModeToggle}>
      <FontAwesomeIcon icon={faCircleHalfStroke} />
    </DarkModeButtonStyle>
  );
};

export default DarkModeButton;
