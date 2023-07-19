import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfzOQLsMmW_hGZN2IKhJLMwxRDdk7LkZ4",
  authDomain: "react-notes-350e7.firebaseapp.com",
  projectId: "react-notes-350e7",
  storageBucket: "react-notes-350e7.appspot.com",
  messagingSenderId: "64040634993",
  appId: "1:64040634993:web:87f5771b2ca020bec7a9d0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
