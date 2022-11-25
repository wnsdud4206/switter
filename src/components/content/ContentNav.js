import styled, { css } from "styled-components";

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
          background-color: rgba(128, 128, 128, 0.2);
        }
      }

      &.active {
        button {
          background-color: rgba(128, 128, 128, 0.3);
        }
      }
    }
  }
`;

const NavList = ({ name, text, contentType, onContentType }) => (
  <li className={name === contentType ? "active" : ""}>
    <button name={name} onClick={onContentType}>
      {text}
    </button>
  </li>
);

const ContentNav = ({ contentType, onContentType }) => {
  const navListArr = [
    { name: "myContents", text: "게시글" },
    { name: "myLikes", text: "좋아하는 글" },
    { name: "myComments", text: "댓글 쓴 글" },
  ];

  return (
    <ContentNavStyle id="contentNav">
      <ul id="contentMenu">
        {navListArr.map(({ name, text }) => (
          <NavList
            key={name}
            name={name}
            text={text}
            contentType={contentType}
            onContentType={onContentType}
          />
        ))}
      </ul>
    </ContentNavStyle>
  );
};

export default ContentNav;
