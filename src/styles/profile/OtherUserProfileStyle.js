import styled from "styled-components";

const OtherUserProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div#otherUesrAttachment {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    background-color: white;

    width: 80px;
    height: 80px;

    margin: 16px 0;
    border: 2px solid #00acee;
    border-radius: 50%;
    box-sizing: border-box;

    overflow: hidden;

    img {
    }

    svg {
      color: #00bdee;

      width: 60px;
      height: 60px;
    }
  }

  & > span {
    font-size: 1.2em;

    padding-bottom: 28px;
  }
`;

export default OtherUserProfileStyle;
