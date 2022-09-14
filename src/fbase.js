import { initializeApp } from "firebase/app";
// import "firebase/auth";  // firebase v9부터는 getAuth()를 불러와 사용해야 한다.
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID
};

// export default initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export default app;
export {
  getAuth as authService,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signIn,
  onAuthStateChanged as onAuth
};