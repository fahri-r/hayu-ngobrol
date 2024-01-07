// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSfRyiw4m5g4trRmPVhyj2vs56RCSO20A",
  authDomain: "realtime-chat-582d7.firebaseapp.com",
  projectId: "realtime-chat-582d7",
  storageBucket: "realtime-chat-582d7.appspot.com",
  messagingSenderId: "483217693759",
  appId: "1:483217693759:web:c336a467d76bcb7977ac8a"
};

// Initialize Firebase
const app = getApps().length? getApp():initializeApp(firebaseConfig);