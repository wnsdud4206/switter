import styled from "styled-components";

const HomeStyle = styled.div`
  /* div#sweetListContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    
    height: ${({ sweetHeight }) => {
    return sweetHeight;
  }}px;

    transition: height 0.5s;

    outline: 1px solid white; */

  div#sweetList {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 24px;

    /* visibility: hidden; */
    
    overflow: hidden;

    /* 자식요소가 추가될 때마다 height값이 늘어나는 애니메이션 어떻게 구현? */

    // 61(height) 24(gap)
    /* height: 450px; */
    // 더 쉬운 방법 없나...
    height: ${({ sweetLength }) => {
      if (sweetLength === 0) {
        return 0;
      } else if (sweetLength === 1) {
        return 82;
      } else if (sweetLength > 1) {
        return sweetLength * 106 - 24;
      }
    }}px;
    
    transition: height 0.5s;
  }
  /* } */

  /* outline: 1px solid white; */
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
