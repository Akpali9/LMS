import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsjzB6f-5Uth_ZcQFbjq-0MiSZi9wmVA0",
  authDomain: "pruta-f590c.firebaseapp.com",
  projectId: "pruta-f590c",
  storageBucket: "pruta-f590c.firebasestorage.app",
  messagingSenderId: "839009218719",
  appId: "1:839009218719:web:82a28d8d5960ad0559b2aa",
  measurementId: "G-2KSG3JW9JN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
