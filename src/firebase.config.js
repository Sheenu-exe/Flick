import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd6-VrCg3C-d_rXj173DQFwsM4CyUEmzI",
  authDomain: "chatapp-d7348.firebaseapp.com",
  projectId: "chatapp-d7348",
  storageBucket: "chatapp-d7348.appspot.com",
  messagingSenderId: "869085294220",
  appId: "1:869085294220:web:67a384b9ea16955bdc95a9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
