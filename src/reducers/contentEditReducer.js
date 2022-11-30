import {
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  storageService,
  ref,
  uploadString,
  getDownloadURL,
  collection,
  dbService,
  doc,
  updateDoc,
  deleteObject,
} from "fbase";

const onEdit = createAction("EDIT/ONEDIT");
const newContent = createAction("EDIT/NEWCONTENT");
const editContent = createAction("EDIT/EDITCONTENT");
const offEdit = createAction("EDIT/OFFEDIT");

let Initializing = {
  mode: false,
  content: null,
};

// redux로 할 필요가 없었겠는데?
export const editReducer = createReducer(Initializing, {
  [onEdit.type]: (state, action) => {
    // A case reducer on a non-draftable value must not return undefined 에러는 아래처럼 return 해주지 않으면 나옴, state가 mutate하지 않았나?
    return (state = { mode: true, content: action.payload?.content });
  },
  [newContent.type]: async (state, action) => {
    const { attachment, text, uid } = action.payload;
    try {
      //   // 사진 여러개는??, 최대 10개까지, gif도?
      let attachmentUrlArr = [];
      if (attachment.length > 0) {
        // storage에 image 저장
        for (let att of attachment) {
          const attachmentRef = ref(
            storageService(),
            `${uid}/sweetImages/${uuidv4()}`,
          );
          // eslint-disable-next-line no-unused-vars
          const response = await uploadString(attachmentRef, att, "data_url");
          // image url 다운
          let attachmentUrl = await getDownloadURL(attachmentRef);
          attachmentUrlArr = [...attachmentUrlArr, attachmentUrl];
        }
      }

      const contentObj = {
        text,
        createdAt: Date.now(),
        creatorId: uid,
        attachmentUrl: attachmentUrlArr,
      };
      
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(dbService(), "contents"),
        contentObj,
      );

      return (state = { mode: false, content: null });
    } catch (error) {
      console.error(error);
    }
  },
  [editContent.type]: async (state, action) => {
    const { attachment, text, uid, content } = action.payload;
    try {
      // storage image 중복&없어진거 지우고 새로운 이미지 추가
      let attachmentUrlArr = [];
      if (attachment.length > 0) {
        // storage에 image 저장
        for (let att of attachment) {
          if (content.attachmentUrl.includes(att))
            attachmentUrlArr = [...attachmentUrlArr, att];
          else {
            const attachmentRef = ref(
              storageService(),
              `${uid}/sweetImages/${uuidv4()}`,
            );
            // eslint-disable-next-line no-unused-vars
            const response = await uploadString(attachmentRef, att, "data_url");
            // image url 다운
            let attachmentUrl = await getDownloadURL(attachmentRef);
            attachmentUrlArr = [...attachmentUrlArr, attachmentUrl];
          }
        }

        for (let con of content.attachmentUrl) {
          console.log(!attachment.includes(con));
          if (!attachment.includes(con)) {
            const attachmentRef = ref(storageService(), con);
            // eslint-disable-next-line no-unused-vars
            const response = await deleteObject(attachmentRef);
          }
        }
      }

      if (!content.attachmentUrl.length) {
        for (let img of content.attachmentUrl) {
          const r = ref(storageService(), img);
          await deleteObject(r);
        }
      }

      const d = doc(dbService(), "contents", `${content.id}`);
      await updateDoc(d, { text, attachmentUrl: attachmentUrlArr });

      return (state = { mode: false, content: null });
    } catch (error) {
      console.error(error);
    }
  },
  [offEdit.type]: (state, action) => {
    return (state = { mode: false, content: null });
  },
});

export const editActions = { onEdit, newContent, editContent, offEdit };