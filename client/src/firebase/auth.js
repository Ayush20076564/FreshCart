import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const observeAuthState = (callback) => onAuthStateChanged(auth, callback);