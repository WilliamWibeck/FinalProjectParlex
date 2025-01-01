import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export const fetchAccuracy = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userRef = doc(db, "user_progress", user.uid);
      const userDoc = await getDoc(userRef);

      const data = userDoc.data();
      console.log("data", data);

      const wordsLearned = data?.wordsLearned || 0;
      const sentencesLearned = data?.sentencesLearned || 0;
      const wordOrderCompleted = data?.wordOrderCompleted || 0;

      const incorrectGuessesFlashcard = data?.incorrectGuesses.flashcards || 0;
      console.log(data.incorrectGuesses);

      const incorrectGuessesCompleteSententence =
        data?.incorrectGuesses.completeSentence || 0;
      const incorrectGuessesWordOrder = data?.incorrectGuesses?.wordorder || 0;

      const totalFlashCardScore = wordsLearned + incorrectGuessesFlashcard;
      const totalCompleteSentenceScore =
        sentencesLearned + incorrectGuessesCompleteSententence;
      const totalWordOrderScore =
        wordOrderCompleted + incorrectGuessesWordOrder;

      console.log(
        "wordsLearned:",
        wordsLearned,
        " ",
        "wrongGuesses: ",
        incorrectGuessesFlashcard,
        "wrong guesses sentences: ",
        incorrectGuessesCompleteSententence
      );

      const flashCardAccuracy =
        totalFlashCardScore > 0
          ? ((wordsLearned / totalFlashCardScore) * 100).toFixed(0)
          : 0;

      const completeSentenceAccuracy =
        totalCompleteSentenceScore > 0
          ? ((sentencesLearned / totalCompleteSentenceScore) * 100).toFixed(0)
          : 0;

      const wordOrderAccuracy =
        totalWordOrderScore > 0
          ? ((wordOrderCompleted / totalWordOrderScore) * 100).toFixed(0)
          : 0;
      return {
        flashCardAccuracy,
        completeSentenceAccuracy,
        wordOrderAccuracy,
      };
    } catch (error) {
      console.error("Error fetching ", error);
    }
  } else {
    console.error("No user :(");
    return;
  }
};
