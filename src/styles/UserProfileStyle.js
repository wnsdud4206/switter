import styled from "styled-components";

const UserProfileStyle = styled.div`
  display: flex;
  align-items: flex-start; // 내 소개가 길어질 수 있기 때문
  // 모바일에서는 column으로 보이게

  width: 100%;

  margin: 16px 0 0;
  padding: 20px 0;

  div#attachmentProfile {
    div#userAttachment {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        border-radius: 50%;
        margin: 0 7vw;
      }
    }
  }

  div#textProfile {
    div#textProfileHeader {
      display: flex;
      align-items: center;

      outline: 1px solid white;

      h2#userName {
        font-weight: lighter;

        letter-spacing: 0.5px;

        margin: 0;
      }
      div#textProfileActions {
        display: flex;
        gap: 12px;

        margin-left: 32px;

        button {
          border: none;
          outline: none;
          background: none;
          padding: 0;

          color: var(--sub-color);

          cursor: pointer;

          &#profileEditBtn {
            svg {
              color: var(--icon-color);
            }
          }

          &#logOutBtn {
            svg {
              color: rgba(128, 128, 128, 0.7);

              transition: color 0.2s;

              &:hover {
                color: #ff6633;
              }
            }
          }

          svg {
            font-size: 24px;
          }
        }
      }
    }

    p {
    }
  }
`;

export default UserProfileStyle;
