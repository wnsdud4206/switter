import React, { useState } from "react";
import { doc, updateDoc, deleteDoc, dbService, storageService, ref, deleteObject } from "fbase";

const Sweet = ({ sweetObj, isOwner }) => {
  // editing과 newSweet은 분리시켜야 한다.
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  // 삭제, deleteDoc
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this sweet?");
    if (ok) {
      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      const r = ref(storageService(), sweetObj.attachmentUrl);
      await deleteDoc(d);
      await deleteObject(r);
    }
  };

  // 수정, updateDoc
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  // async&await는 써도되고 안써도 된다. 어떤 방법을 써도 snapshot 덕분에 업데이트는 확인할 수 있기 때문이다.
  const onSubmit = async (event) => {
    event.preventDefault();
    const d = doc(dbService(), "sweets", `${sweetObj.id}`);
    await updateDoc(d, { text: newSweet });
    toggleEditing();
  };
  const onChange = ({ target: { value } }) => {
    setNewSweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {/* 왜 form안에 넣어줬지? input은 무조건 form 안에 있어야 하나? */}
          <form onSubmit={onSubmit}>
            {/* required는 아무것도 입력하지 않고 제출하면 경고창이 뜨게 해주는 속성 */}
            <input
              type="text"
              placeholder="Edit your sweet"
              value={newSweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Sweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmentUrl && (
            <img
              src={sweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="sweetImage"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Sweet</button>
              <button onClick={toggleEditing}>Edit Sweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
