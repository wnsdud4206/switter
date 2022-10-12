import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, doc, updateDoc } from "fbase";
import { useEffect, useState } from "react";
import CommentEditStyle from "styles/CommentEditStyle";

const CommentEdit = ({
  commentName,
  offCommentEditing,
  commentObj,
  commentEditing,
}) => {
  const [newCommentText, setNewCommentText] = useState("");

  const onChange = ({ target: { value } }) => {
    setNewCommentText(value);
  };

  useEffect(() => {
    setNewCommentText(commentObj.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentEditing]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const d = doc(dbService(), "comments", `${commentObj.id}`);
      await updateDoc(d, { text: newCommentText });

      offCommentEditing();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentEditStyle>
      <form onSubmit={onSubmit}>
        <div className="commentEditHeader">
          <span className="commentEditUserName">{commentName}</span>
          <div className="commentEditAndDelete">
            <label htmlFor="commentEdit">
              <FontAwesomeIcon icon={faPencil} />
              <input type="submit" id="commentEdit" />
            </label>
            <button className="commentEditCancel" onClick={offCommentEditing}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        <input
          type="text"
          className="newCommentText"
          value={newCommentText}
          onChange={onChange}
          required
          autoFocus
        />
      </form>
    </CommentEditStyle>
  );
};

export default CommentEdit;
