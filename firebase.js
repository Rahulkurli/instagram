// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiiOG_IjxGdn4wq0gN8IgpHR2kbipscWE",
  authDomain: "instagram-2-fcb2d.firebaseapp.com",
  projectId: "instagram-2-fcb2d",
  storageBucket: "instagram-2-fcb2d.appspot.com",
  messagingSenderId: "646497124662",
  appId: "1:646497124662:web:43bdf691b25f9ac5d57397",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
