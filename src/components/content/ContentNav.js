import styled from "styled-components";

const ContentNavStyle = styled.nav`
  width: 470px;

  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 8px;
  box-sizing: border-box;

  ul#contentMenu {
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    justify-content: space-between;

    li {
      line-height: 50%;

      button {
        outline: none;
        background: none;
        border: none;
        padding: 6px;

        border-radius: 4px;

        color: var(--sub-color);

        cursor: pointer;

        transition: background-color 0.2s;

        &:hover {
          background-color: rgba(128, 128, 128, 0.3);
        }
      }
    }
  }
`;

const NavList = ({ name, onContentType, text }) => (
  <li>
    <button name={name} onClick={onContentType}>
      {text}
    </button>
  </li>
);

const ContentNav = ({ onContentType }) => {
  const navListArr = [
    { name: "myContents", text: "내가 쓴 글" },
    { name: "myLikes", text: "내가 좋아요한 글" },
    { name: "myComments", text: "내가 댓글 단 글" },
  ];

  return (
    <ContentNavStyle id="contentNav">
      <ul id="contentMenu">
        {navListArr.map(({ name, text }) => (
          <NavList
            key={name}
            name={name}
            text={text}
            onContentType={onContentType}
          />
        ))}
      </ul>
    </ContentNavStyle>
  );
};

export default ContentNav;
