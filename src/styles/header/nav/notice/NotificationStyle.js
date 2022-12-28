import styled, { css } from "styled-components";

const NotificationStyle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  padding: 8px 0;

  &:not(:first-child) {
    border-top: 2px solid var(--border-color);
  }
  & > div {
    /* min-height: 50px; */
  }

  div.noticeProfileImage {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    min-width: 36px;
    height: 36px;

    background-color: white;

    border-radius: 50%;

    overflow: hidden;

    img {
      width: 36px;
      height: 36px;
    }

    svg {
      color: var(--icon-color);

      width: 24px;
      height: 24px;
    }
  }

  a.moveToProfile {
    text-decoration: none;
    font-size: 0.9em;

    color: ${({ confirm }) => (confirm ? "#aaa" : "var(--sub-color)")};

    padding: 12px 0;

    transition: background-color 0.2s;

    span {
      pointer-events: none;
    }

    &:hover {
      background-color: rgba(135, 135, 135, 0.2);
    }
  }

  button.noticeTextBtn {
    outline: none;
    background: none;
    border: none;
    padding: 12px 0;

    color: ${({ confirm }) => (confirm ? "#aaa" : "var(--sub-color)")};
    font-size: 0.9em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    transition: background-color 0.2s;

    cursor: pointer;

    span {
      pointer-events: none;
    }

    &:hover {
      background-color: rgba(135, 135, 135, 0.2);
    }
  }

  button.confirm {
    background: none;
    outline: none;
    border: none;

    margin: 0;
    padding: 0;

    font-weight: bold;
    font-size: 0.9em;

    ${({ confirm }) =>
      confirm
        ? css`
            pointer-events: none;
            svg {
              color: #444;
            }
          `
        : css`
            cursor: pointer;
            svg {
              color: var(--icon-color);
            }
          `};
  }
`;

export default NotificationStyle;
