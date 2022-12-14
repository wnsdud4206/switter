import { dbService, collection, query, onSnapshot } from "fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [userProfileImage, setUserProfileImage] = useState(userObj.photoURL);
  useEffect(() => {
    const q = query(collection(dbService(), "users"));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot);
      // console.log(snapshot.docs);
      // console.log(userObj);
      // const sweetArr = snapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(), // creatorId, createdAt, text
      // }));
      const sweetArr = snapshot.docs.forEach((doc) => {
        // console.log("id: " + doc.id);
        // console.log(userObj.uid);
        // console.log(doc.data()); // creatorId, createdAt, text
        // 위 doc.data()안에 객체 안에 uid를 사용하면 성능낭비같음, findIndex였나? find였나 그걸로 찾아서 써야하는데 문서의 이름만 출력하는 명령어를 아직 모르겠음
        if (doc.id === userObj.uid) {
          setUserName(doc.data().displayName);
          setUserProfileImage(doc.data().attachmentUrl);
          return;
        }
      });
      // const sweetArr = snapshot.docs.find(doc => doc.id === userObj.uid);
    });
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{userName}'s Profile</Link>
          </li>
        </ul>
      </nav>
      {userProfileImage && (
        <img
          src={userProfileImage}
          width="50px"
          height="50px"
          style={{ borderRadius: "50%" }}
          alt="profileImage"
        />
      )}
    </>
  );
};

export default Navigation;

// Profile.js에서 updateProfile 동작시 실시간으로 displayName이 적용되도록 구현
// ex. 문제는 자동으로 rerender 되지 않음
// import { onAuth, authService } from "fbase";
// import { useEffect, useState } from "react";
// ...
//   const [userName, setUserName] = useState("");
//   useEffect(() => {
//     onAuth(authService(), (user) => {
//       if (user) {
//         setUserName(user.displayName);
//       }
//     });
//   }, []);
// ...
// 해결 방안 1. updateProfile의 photoURL 숙제에서 사용하는 거긴 한데 firestore에 users라는 collection을 만들어 그 안에 유저들은 정보들이나 sweet들을 저장하는 문서들을 만들고 그 문서에서 지금 로그인된 유저를 찾아 그 유저의 displayName을 onSnapshot으로 호출하면 실시간으로 동작하지 않을까 싶다.(onSnapshot은 authentication에는 없기 때문)
// onAuthStateChanged의 user와 createUserWithEmailAndPassword(as createUser) 또는 signInWithEmailAndPassword(as signInEmail) 또는 signInWithPopup(as signInSocial)을(이하 data) console에 출력한 결과 data안에 user가 있는 것을 확인(data > user), 근데 딱히 data를 쓰지않고 user로 사용해도 될듯
// user에서 따로 displayName, email, photoURL, uid를 저장하거나 혹은 user > providerData[array](위 properties 외에도 phoneNumber, providerID가 있음) 를 저장해서 사용하면 될듯
// 이제 이 user 정보를 firestore에 users라는 collection을 만들어 저장하는 로직을 Auth.js에서 구현하고 Profile.js에서 불러와 onSnapshot을 사용해서 실시간으로 데이터를 바꿀 수 있도록 구현해주면 될듯
// * 로그인 할 때마다 users collection에 중복으로 추가되는 문제가 발생하는데 문서의 이름을 랜덤으로 하지 않고 `${providerId}/${email}`이런식으로 만들어서 중복되면 실행되지 않게끔 진행하거나 다른 방법을 찾아야할듯 - 참고: https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#set_a_document

// Profile.js에 updateProfile을 firestore의 users에도 반영되도록 해야됨
// 이제 users collection에 저장하는 것은 됐고(아직 부족하지만) 이제 Navigation.js에서 users collection의 문서이름(user의 uid)를 가져오는 방법을 알아야함, 왜나하면 그 문서의 이름(uid)와 props로 받은 userObje.uid를 비교하여 같은 문서를 가져와 사용 - XXX, 이미 snapshot으로 변경을 감지하고 있으니 updateProfile만 users collection의 해당문서의 displayName만 잘 수정되도록 해야함

// 성공!!
// + 프로필 사진 바꿀 때 기존의 사진 지우는 기능도 추가해야 할듯 - 성공
// + sweet Edit 할 때 사진도 바뀌도록? - 나중에...

// 강의랑 같이 볼 수 있게 branch로 나눠서 구현할 걸 그랬네..