import {
  createAction,
  createReducer,
  configureStore,
  getDefaultMiddleware,
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
// import getSweets from "db/getSweets";

// 비동기로 하려면 createSlice로 하면 안될듯

// getSweets를 어떻게 불러와서 state의 기본값으로 사용하지??

const onEdit = createAction("ONEDIT");
const newContent = createAction("NEWCONTENT");
const editContent = createAction("EDITCONTENT");
const offEdit = createAction("OFFEDIT");
// const newComment = createAction("NEWCOMMENT");

let Initializing = {
  mode: false,
  content: null,
};

// redux로 할 필요가 없었겠는데?
const editReducer = createReducer(Initializing, {
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
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(dbService(), "contents"),
        contentObj,
      );

      // state.mode = mode;
      // state.content = null;
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

export default configureStore({
  reducer: editReducer,
  // 편법인가?? - 참고: https://guiyomi.tistory.com/116
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
