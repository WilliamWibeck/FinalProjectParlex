import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
} from "firebase/auth";
import { auth } from "./firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

export const signup = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const auth = getAuth();
  const db = getFirestore();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    const userRef = doc(db, "user_progress", user.uid);
    await setDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      categoriesPractised: {},
      wordsByDate: {},
      sentencesByDate: {},
      wordOrderByDate: {},
      totalWordsLearned: 0,
      totalSentencesAttempted: 0,
      totalWordOrderAttempted: 0,
      wordFailed: {},
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    alert("Logged out");
  } catch (error) {
    throw new Error(error.message);
  }
};
