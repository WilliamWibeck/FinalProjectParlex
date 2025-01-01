import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const trackFailedWord = async (wordId: string) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "user_progress", user.uid);
    try {
      await updateDoc(userRef, {
        [`wordsFailed.${wordId}`]: increment(1),
        totalWordsAttempted: increment(1),
      });
      console.log(`Failed word ${wordId}`);
    } catch {
      console.log("Error tracking failed word");
    }
  }
};
