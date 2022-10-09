import CloseUpImgContainerStyle from "styles/CloseUpImgContainerStyle";

const CloseUpImgContainer = ({ showCloseUpImg, onCloseUpImg, closeUpImg }) => (
  <CloseUpImgContainerStyle
    className={`closeUpImgContainer ${!showCloseUpImg ? "visible" : ""}`}
    onClick={onCloseUpImg}
  >
    {closeUpImg ? (
      <img
        src={closeUpImg}
        // width="100%"
        // height="100%"
        alt="CloseUpSweetImage"
      />
    ) : (
      <span className="imgLoadingBox">Image Loading..</span>
    )}
  </CloseUpImgContainerStyle>
);

export default CloseUpImgContainer;
