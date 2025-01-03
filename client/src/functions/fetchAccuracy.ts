import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export interface AccuracyStats {
  flashCardAccuracy: number;
  completeSentenceAccuracy: number;
  wordOrderAccuracy: number;
}

export const fetchAccuracy = async (): Promise<AccuracyStats | null> => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userRef = doc(db, "user_progress", user.uid);
      const userDoc = await getDoc(userRef);

      const data = userDoc.data();
      if (!data) {
        console.error("No data found for user.");
        return null;
      }

      const wordsLearned = data?.wordsLearned || 0;
      const sentencesLearned = data?.sentencesLearned || 0;
      const wordOrderCompleted = data?.wordOrderCompleted || 0;

      const incorrectGuessesFlashcard = data?.incorrectGuesses?.flashcards || 0;
      const incorrectGuessesCompleteSentence =
        data?.incorrectGuesses?.completeSentence || 0;
      const incorrectGuessesWordOrder = data?.incorrectGuesses?.wordorder || 0;

      const totalFlashCardScore = wordsLearned + incorrectGuessesFlashcard;
      const totalCompleteSentenceScore =
        sentencesLearned + incorrectGuessesCompleteSentence;
      const totalWordOrderScore =
        wordOrderCompleted + incorrectGuessesWordOrder;

      const flashCardAccuracy =
        totalFlashCardScore > 0
          ? Math.round((wordsLearned / totalFlashCardScore) * 100)
          : 0;

      const completeSentenceAccuracy =
        totalCompleteSentenceScore > 0
          ? Math.round((sentencesLearned / totalCompleteSentenceScore) * 100)
          : 0;

      const wordOrderAccuracy =
        totalWordOrderScore > 0
          ? Math.round((wordOrderCompleted / totalWordOrderScore) * 100)
          : 0;

      return {
        flashCardAccuracy,
        completeSentenceAccuracy,
        wordOrderAccuracy,
      };
    } catch (error) {
      console.error("Error fetching accuracy data:", error);
      return null;
    }
  } else {
    console.error("No user is authenticated.");
    return null;
  }
};
