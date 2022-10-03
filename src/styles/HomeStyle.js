import styled from "styled-components";

const HomeStyle = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start; */

  /* outline: 1px solid red; */

  div#sweetConatiner {
    /* display: flex;
    flex-direction: column;
    justify-content: flex-end; */

    position: relative;

    overflow: hidden;
    /* overflow: visible; */

    height: ${({ boxSize }) => boxSize}px;

    transition: height 0.5s;

    /* outline: 1px solid white; */

    div#sweetList {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 24px;

      width: 100%;

      position: absolute;
      bottom: 0;
      /* top: 0; */

      overflow: hidden;

      /* outline: 1px solid powderblue; */
    }
  }
`;

export default HomeStyle;

// 6-1. Styled 5:07
// profile 이미지 가져오고 나머지 꾸미기, 계정 생성할 때 displayName, photoURL(attachmentUrl) 설정할 수 있도록 로직 추가하기, NavigationStyle에서 ul 태그 말고 button으로 바꾸기

/* <div>
<SweetFactory userObj={userObj} />
<div>
  {sweets.map((sweet) => (
    <Sweet
      key={sweet.id}
      sweetObj={sweet}
      isOwner={sweet.creatorId === userObj.uid}
    />
  ))}
</div>
</div> */
