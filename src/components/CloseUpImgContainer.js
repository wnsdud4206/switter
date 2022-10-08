import CloseUpImgContainerStyle from "styles/closeUpImgContainerStyle";

const CloseUpImgContainer = ({
  visibleCloseUpImg,
  onCloseUpImg,
  closeUpImg,
  innerSize,
}) => (
  <CloseUpImgContainerStyle
    className={`closeUpImgContainer ${!visibleCloseUpImg && "visible"}`}
    onClick={onCloseUpImg}
    innerSize={innerSize}
  >
    <div className="closeUpImgSize">
      <img
        src={closeUpImg}
        width="100%"
        height="100%"
        alt="CloseUpSweetImage"
      />
    </div>
  </CloseUpImgContainerStyle>
);

export default CloseUpImgContainer;
