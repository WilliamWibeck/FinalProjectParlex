import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export const incrementWordOrder = async () => {
  const user = auth.currentUser;

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");

  if (user) {
    const userRef = doc(db, "user_progress", user.uid);

    try {
      await updateDoc(userRef, {
        wordOrderCompleted: increment(1),
      });
      await updateDoc(userRef, {
        [`wordOrderByDate.${formattedDate}`]: increment(1),
      });
      await updateDoc(userRef, {
        totalWordOrderAttempted: increment(1),
      });
      await updateDoc(userRef, {
        lastCategory: "wordorder",
      });
    } catch (error) {
      console.error("Error updating progress", error);
    }
  } else {
    console.error("No user logged in!");
  }
};
