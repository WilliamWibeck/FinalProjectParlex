import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const incrementWordsLearned = async () => {
  const user = auth.currentUser;

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");
  console.log(formattedDate);

  if (user) {
    const userRef = doc(db, "user_progress", user.uid);

    try {
      await updateDoc(userRef, {
        wordsLearned: increment(1),
      });
      await updateDoc(userRef, {
        [`wordsByDate.${formattedDate}`]: increment(1),
      });
      await updateDoc(userRef, {
        lastCategory: "vocabulary",
      });
      console.log("Progress updated: wordsLearned incremented.");
    } catch (error) {
      console.error("Error updating progress:", error.message);
    }
  } else {
    console.error("No user is logged in.");
  }
};
