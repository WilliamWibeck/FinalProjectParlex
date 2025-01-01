import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export const incrementWrongGuessFlashCard = async () => {
  const user = auth.currentUser;

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");

  if (user) {
    const userRef = doc(db, "user_progress", user.uid);
    console.log("hello :D");
    try {
      await updateDoc(userRef, {
        "incorrectGuesses.flashcards": increment(1),
        [`incorrectGuessesByDate.${formattedDate}.flashcards`]: increment(1),
      });
      console.log("Wrong guess tracked");
    } catch {
      console.error("Error tracking wrong guess");
    }
  } else {
    console.error("No user :(");
  }
};
