import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dbService,
  doc,
  getDocs,
  setDoc,
  deleteField,
  deleteDoc,
  query,
  collection,
} from "fbase";
import CommentContentStyle from "styles/sweet/comment/CommentContentStyle";
import CommentActions from "./CommentActions";

const CommentContent = ({
  userObj,
  commentObj,
  sweetObj,
  isOwner,
  onCommentEditing,
  commentName,
}) => {
  const onDeleteComment = async () => {
    try {
      const ok = window.confirm(
        "Are you sure you want to delete this comment?",
      );
      if (ok) {
        const commentDoc = doc(dbService(), "comments", `${commentObj.id}`);
        await deleteDoc(commentDoc);

        const noticeQuery = query(collection(dbService(), "notifications"));
        const noticeDocs = await getDocs(noticeQuery);
        noticeDocs.docs.forEach(async (noticeDoc) => {
          if (Object.keys(noticeDoc.data()).includes(sweetObj.id)) {
            const notice = doc(
              dbService(),
              "notifications",
              noticeDoc.id,
            );
            await setDoc(
              notice,
              {
                [sweetObj.id]: {
                  sweetComments: {
                    [sweetObj.id + "/" + commentObj.id]: deleteField(),
                  },
                  commentLikes: {
                    [commentObj.id]: deleteField(),
                  },
                },
              },
              { merge: true },
            );
          }
        });

        // const userDoc = doc(
        //   dbService(),
        //   "users",
        //   authService().currentUser.uid,
        // );
        // await setDoc(
        //   userDoc,
        //   {
        //     comments: { [sweetObj.id]: arrayRemove(commentObj.id) },
        //   },
        //   { merge: true },
        // );
        // const getUserDoc = await getDoc(userDoc);
        // if (getUserDoc.data()?.comments[sweetObj.id].length === 0) {
        //   await setDoc(
        //     userDoc,
        //     {
        //       comments: { [sweetObj.id]: deleteField() },
        //     },
        //     { merge: true },
        //   );
        // }

        // const { uid } = authService().currentUser;
        // notification(
        //   "REMOVE",
        //   "sweetComments",
        //   commentObj.creatorId,
        //   sweetObj.id,
        //   uid,
        //   commentObj.id,
        // );
        // notification(
        //   "REMOVE",
        //   "sweetComments",
        //   sweetObj.creatorId,
        //   sweetObj.id,
        //   commentObj.id,
        // );
        // }, 250);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentContentStyle>
      <div className="commentHeader">
        <span className="commentUserName">{commentName}</span>
        {isOwner && (
          <div className="commentEditAndDelete">
            <button className="commentEdit" onClick={onCommentEditing}>
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button className="commentDelete" onClick={onDeleteComment}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>

      <p className="commentText">{commentObj.text}</p>

      <CommentActions userObj={userObj} commentObj={commentObj} sweetObj={sweetObj} />
    </CommentContentStyle>
  );
};

export default CommentContent;
