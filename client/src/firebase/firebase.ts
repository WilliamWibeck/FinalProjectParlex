import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPcA3OMsPIFfXEJlSm_7ikohWb-N9a9Wg",
  authDomain: "parlex-b0578.firebaseapp.com",
  projectId: "parlex-b0578",
  storageBucket: "parlex-b0578.firebasestorage.app",
  messagingSenderId: "422711640172",
  appId: "1:422711640172:web:d29c3cfb9cffc8fc0f1849",
  measurementId: "G-WQ4YNWWDCV",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
