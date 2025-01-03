import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

//Denna funktion har bara i uppgift att uppdatera antal felaktiga gissningar i flashcards.
export const incrementWrongGuessFlashCard = async () => {
  const user = auth.currentUser;

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");

  if (user) {
    const userRef = doc(db, "user_progress", user.uid);

    try {
      await updateDoc(userRef, {
        "incorrectGuesses.flashcards": increment(1),
        [`incorrectGuessesByDate.${formattedDate}.flashcards`]: increment(1),
      });
      console.error("Wrong guess tracked");
    } catch (error: unknown) {
      console.error("Error: ", error);
    }
  } else {
    console.error("No user :(");
  }
};
