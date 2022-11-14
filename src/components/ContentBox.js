import styled from "styled-components";

const ContentBoxStyle = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  div#contentBoxBackground {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

    div#contentBox {
      display: flex;
      flex-direction: row;
      
      // 임시, mobile에서는 다르게
      width: 700px;
      height: 500px;

      outline: 1px solid white;
      
      & > div {
        width: 100%;
        height: 100%;
      }
      div#leftBox {
        outline: 1px solid red;
      }
      div#rightBox {
        outline: 1px solid green;
      }
    }
  }
`;

const ContentBox = () => {
  return (
    <ContentBoxStyle>
      <div id="contentBoxBackground">
        <div id="contentBox">
          {/* left */}
          <div id="leftBox">leftBox</div>
          {/* right */}
          <div id="rightBox">rightBox</div>
        </div>
      </div>
    </ContentBoxStyle>
  );
};

export default ContentBox;
