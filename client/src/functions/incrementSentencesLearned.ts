import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export const incrementSentencesLearned = async () => {
  const user = auth.currentUser;
  console.log(user);

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");

  if (user) {
    const userRef = doc(db, "user_progress", user.uid);

    try {
      await updateDoc(userRef, {
        sentencesLearned: increment(1),
      });
      await updateDoc(userRef, {
        [`sentencesByDate.${formattedDate}`]: increment(1),
      });
      await updateDoc(userRef, {
        totalSentencesAttempted: increment(1),
      });
      await updateDoc(userRef, {
        lastCategory: "sentences",
      });
      console.log("Successfully updated progress");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  } else {
    console.error("No user is logged in.");
  }
};
