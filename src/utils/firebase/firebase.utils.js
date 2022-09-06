import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXPiNR6lk1KuLTHrvNx6_-dovXE4hlM5I",
  authDomain: "petrol-consumption.firebaseapp.com",
  projectId: "petrol-consumption",
  storageBucket: "petrol-consumption.appspot.com",
  messagingSenderId: "1005868941734",
  appId: "1:1005868941734:web:03f6576aa34508a3d0cf67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const creatDate = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        creatDate,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  return userDocRef;
};
// ADD data to user
export const addDataToUser = async (dataToAdd, index) => {
  if (!dataToAdd) return;

  if (!auth.currentUser) return;

  const userRef = auth.currentUser.uid;
  const ref = doc(db, `users/${userRef}/data`, index);
  await setDoc(ref, dataToAdd);
};

// GET data from user

export const getDataFromUser = async () => {
  // const userDocRef = doc(db, "users", auth.currentUser.uid);
  if (!auth.currentUser) return;
  const userSnapshot = await getDocs(
    collection(db, `users/${auth.currentUser.uid}/data`)
  );

  const historyList = [];
  userSnapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      data: doc.data(),
    };
    return historyList.push(obj);
  });

  return historyList;
};
// remove data from user
export const removeDataFromUser = async (id) => {
  if (!id) return;
  await deleteDoc(doc(db, `users/${auth.currentUser.uid}/data/${id}`));
};

// listener set on auth
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => await signOut(auth);
