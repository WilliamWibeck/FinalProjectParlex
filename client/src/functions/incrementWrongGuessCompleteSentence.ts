import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export const incrementIncorrectGuessCompleteSentence = async () => {
  const user = auth.currentUser;

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");
  console.log(formattedDate);

  if (user) {
    const userRef = doc(db, "user_progress", user.uid);
    try {
      console.log("Incrementing wrong complete sentence...");
      await updateDoc(userRef, {
        "incorrectGuesses.completeSentence": increment(1),
        [`incorrectGuessesByDate.${formattedDate}.completeSentence`]:
          increment(1),
      });

      console.log("Tracked incorrect sentence guess.");
    } catch (error) {
      console.error("Error tracking incorrect guess:", error);
    }
  } else {
    console.error("No user is logged in.");
  }
};
