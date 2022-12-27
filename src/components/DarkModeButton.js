import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { darkModeActions } from "reducers/darkModeReducer";
import IconButtonStyle from "../styles/IconButtonStyle";

const DarkModeButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkModeState.mode);

  const onDarkModeToggle = () =>
    darkMode
      ? dispatch(darkModeActions.light({ mode: false }))
      : dispatch(darkModeActions.dark({ mode: true }));

  return (
    <IconButtonStyle onClick={onDarkModeToggle}>
      <FontAwesomeIcon icon={faCircleHalfStroke} />
    </IconButtonStyle>
  );
};

export default DarkModeButton;
