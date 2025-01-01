import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();
export const incrementIncorrectGuessWordOrder = async () => {
  const user = auth.currentUser;
  const date = new Date();

  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");
  console.log(formattedDate);

  if (user) {
    const userRef = doc(db, "user_progress", user.uid);

    try {
      console.log("increment complete sentence fail");
      await updateDoc(userRef, {
        ["incorrectGuesses.wordorder"]: increment(1),
        [`incorrectGuessesByDate.${formattedDate}.wordorder`]: increment(1),
      });

      console.log("Wrong guess tracked");
    } catch {
      console.error("Error tracking wrong guess");
    }
  } else {
    console.error("No user :(");
  }
};
