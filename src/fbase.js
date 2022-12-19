import { initializeApp } from "firebase/app";
// import "firebase/auth";  // firebase v9부터는 getAuth()를 불러와 사용해야 한다.
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
  limit,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// export default firebase.initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);
// export default app;
const app = initializeApp(firebaseConfig);
export default app;

// Authentication
export {
  getAuth as authService,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signInEmail,
  onAuthStateChanged as onAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup as signInSocial,
  signOut,
  updateProfile,
  deleteUser,
};

// Firestore
export {
  getFirestore as dbService,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
  limit,
};

// Storage
export {
  getStorage as storageService,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
};
