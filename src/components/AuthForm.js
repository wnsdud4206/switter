// firebase 내장 uuid인가?
import { uuidv4 } from "@firebase/util";
import {
  faNetworkWired,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  authService,
  createUser,
  signInEmail,
  storageService,
  updateProfile,
  ref,
  uploadString,
  getDownloadURL,
} from "fbase";
import React, { useEffect, useRef, useState } from "react";
import userDocCreator from "services/userDocCreator";
import { AuthFormSpanStyle, AuthFormStyle } from "styles/AuthFormStyle";

const AuthForm = () => {
  // displayName, photoURL(attachmentUrl) 추가하기
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [newAccount, setNewAccount] = useState(false);
  const fileInput = useRef();
  const [attachment, setAttachment] = useState("");
  const [error, setError] = useState("");
  const [nameAndPhotoInp, setNameAndPhotoInp] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
  // profile image
  const onPhotoChange = ({ target: { files } }) => {
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // onloadend에 finishedEvent의 result를 setAttachment로 설정해주는 것
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onPhotoClear = (e) => {
    e.preventDefault(); // good!
    setAttachment("");
    fileInput.current.value = "";
  };
  useEffect(() => {
    if (form.displayName.length > 10) {
      alert("10글자");
      const copyForm = { ...form };
      setForm({ ...copyForm, displayName: copyForm.displayName.slice(0, -1) });
    }
  }, [form, newAccount]);

  const onSubmit = async (event) => {
    event.preventDefault();
    // email/password로 계정을 생성하면 google, github와는 다르게 providerId와 displayName, photoURL가 null인 상태인 문제가 발생
    try {
      let data;
      const auth = authService();
      if (newAccount) {
        // if (
        //   form.email === "" ||
        //   form.password.length < 7 ||
        //   form.displayName === ""
        // ) {
        //   alert("빈 입력창이 없도록 확인해 주세요.");
        //   return;
        // }

        data = await createUser(auth, form.email, form.password);

        let attachmentUrl = "";

        if (attachment !== "") {
          const attachmentRef = ref(
            storageService(),
            `${authService().currentUser.uid}/profileImages/${uuidv4()}`,
          );
          // eslint-disable-next-line no-unused-vars
          const response = await uploadString(
            attachmentRef,
            attachment,
            "data_url",
          );
          attachmentUrl = await getDownloadURL(attachmentRef);
        }

        await updateProfile(auth.currentUser, {
          displayName: form.displayName,
          photoURL: attachmentUrl,
        });
      } else {
        data = await signInEmail(auth, form.email, form.password);
      }

      // email/password는 displayName 등등 유저 정보가 null로 생성되는 문제
      userDocCreator(data);
    } catch (error) {
      console.dir(error);
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  useEffect(() => {
    // Good!!
    if (newAccount) {
      setNameAndPhotoInp(newAccount);
    } else if (!newAccount) {
      setTimeout(() => {
        setNameAndPhotoInp(newAccount);
      }, 310);
    }
  }, [newAccount]);

  return (
    <>
      <AuthFormStyle newAccount={newAccount} onSubmit={onSubmit}>
        {nameAndPhotoInp && (
          <>
            <label htmlFor="fileBtn">
              <div id="profileImageInp">
                {attachment ? (
                  <>
                    <img
                      width="70"
                      height="70"
                      src={attachment}
                      alt="profileImage"
                    />
                    <button onClick={onPhotoClear}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </>
                ) : (
                  <div>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                )}
              </div>
              <input
                id="fileBtn"
                type="file"
                accept="image/*"
                onChange={onPhotoChange}
                ref={fileInput}
              />
            </label>
            <input
              name="displayName"
              type="text"
              maxLength="11"
              placeholder="Nickname"
              required
              value={form.displayName}
              onChange={onChange}
            />
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.name}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={onChange}
        />
        {/* <input
          name="profileImage"
          type="file"
          placeholder="Password"
          required
          value={form.password}
          onChange={onChange}
        /> */}
        <input type="submit" value={newAccount ? "Create Accont" : "Log In"} />
        {error && <span id="errorText">{error}</span>}
      </AuthFormStyle>
      {/* newAccount를 true로 바꾸어 submit 이벤트의 if문에 따라 버튼을 클릭하면 이전처럼 계정생성이 아닌 로그인(Sign In 메소드)이 되는 것 */}
      <AuthFormSpanStyle onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </AuthFormSpanStyle>
    </>
  );
};

export default AuthForm;
