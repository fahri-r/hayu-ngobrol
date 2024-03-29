import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyBSfRyiw4m5g4trRmPVhyj2vs56RCSO20A",
  authDomain: "realtime-chat-582d7.firebaseapp.com",
  projectId: "realtime-chat-582d7",
  storageBucket: "realtime-chat-582d7.appspot.com",
  messagingSenderId: "483217693759",
  appId: "1:483217693759:web:c336a467d76bcb7977ac8a",
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
