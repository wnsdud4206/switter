import styled from "styled-components";

const SweetContainerStyle = styled.div`
  /* display: flex;
    flex-direction: column;
    justify-content: flex-end; */

  /* position: relative; */

  overflow: hidden;
  /* overflow: visible; */

  /* height: ${({ boxSize }) => boxSize}px;

    transition: height 0.5s; */

  /* height: 550px; */

  padding-bottom: 30vh;

  /* outline: 1px solid white; */

  div#sweetList {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* gap: 24px; */

    /* height: 300px; */
    width: 100%;

    /* position: absolute;*/
    /* bottom: 0; */
    /* top: 0;

      overflow: hidden;  */

    div#loadingBox {
      text-align: center;
    }
  }
`;

export default SweetContainerStyle;