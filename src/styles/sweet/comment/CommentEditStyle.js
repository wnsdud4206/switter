import styled from "styled-components";

const CommentEditStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-top: 8px;
  padding-left: 8px;
  box-sizing: border-box;

  width: calc(100% - 40px);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;

    padding: 0;

    div.commentEditHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      height: 21px;

      margin-bottom: 16px;

      span.commentEditUserName {
      }

      div.commentEditAndDelete {
        display: flex;
        align-items: center;

        label[for="commentEdit"] {
          cursor: pointer;

          svg {
            color: #444;

            width: 14px;
            height: 14px;
          }

          input[type="submit"] {
            display: none;
          }
        }

        button.commentEditCancel {
          outline: none;
          border: none;
          background: none;

          padding: 4px 4px 0px 10px;

          cursor: pointer;

          svg {
            color: #444;

            width: 18px;
            height: 18px;
          }
        }
      }
    }

    input[type="text"] {
      font-size: 1em;
      /* white-space: pre-line; */

      width: 100%;

      margin: 0;
      padding: 4px 0;

      outline: 1px solid red;
    }
  }
`;

export default CommentEditStyle;

/* <CommentEditStyle>
<form className="commentEditHeader">
  <span className="commentEditUserName">{commentName}</span>
  <div className="commentEditAndDelete">
    <label htmlFor="commentEdit">
      <FontAwesomeIcon icon={faPencil} />
      <input type="submit" id="commentEdit" onClick={offCommentEditing} />
    </label>
    <button className="commentDelete" onClick={offCommentEditing}>
      <FontAwesomeIcon icon={faXmark} />
    </button>
  </div>
</form>

<input
  className="newCommentText"
  value={newCommentText}
  onChange={onChange}
  required
  autoFocus
/>
</CommentEditStyle> */
