import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNNYvrvYxd3ztOjoEf6jhowkdr2Jtqt-E",
  authDomain: "freshcart-20076564.firebaseapp.com",
  projectId: "freshcart-20076564",
  storageBucket: "freshcart-20076564.firebasestorage.app",
  messagingSenderId: "922443645479",
  appId: "1:922443645479:web:6066c7f615faa20f8e0402",
  measurementId: "G-V00XT0ZBV3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;