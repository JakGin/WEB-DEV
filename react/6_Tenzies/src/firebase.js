import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-ga2HJeWlLDYfM7WYrtfJu6I-vMG_Usc",
  authDomain: "tenzies-e336e.firebaseapp.com",
  projectId: "tenzies-e336e",
  storageBucket: "tenzies-e336e.appspot.com",
  messagingSenderId: "1017760746219",
  appId: "1:1017760746219:web:90f53fe37aff33a1f14cae"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const winDataCollection = collection(db, "winDataCollection");
